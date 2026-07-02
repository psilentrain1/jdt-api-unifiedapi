import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { APIError } from "better-auth/api";
import { client } from "./mongo.js";
import { origins } from "../common/globals.js";

const SIGNUP_ENABLED = process.env.SIGNUP_ENABLED === "1";

const db = client.db("auth");

type UserWithSiteAccess = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  email: string;
  emailVerified: boolean;
  name: string;
  image?: string | null;
  siteAccess?: string[];
};

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),
  emailAndPassword: {
    enabled: true,
    disableSignUp: !SIGNUP_ENABLED,
  },
  session: {
    cookieCache: {
      enabled: true,
    },
  },
  trustedOrigins: origins,
  user: {
    additionalFields: {
      siteAccess: {
        type: "string[]",
        default: [],
        input: false,
      },
    },
  },
  advanced: {
    defaultCookieAttributes: {
      sameSite: "none",
      secure: true,
      httpOnly: true,
    },
  },
  databaseHooks: {
    user: {
      create: {
        // TODO: This will need to be async if I plan to look up current siteAccess to append
        // and the return Promise will need to be removed
        before: (user, ctx) => {
          const origin =
            ctx?.request?.headers.get("origin") ??
            ctx?.request?.headers.get("referrer") ??
            null;

          return Promise.resolve({
            data: {
              ...user,
              siteAccess: origin ? [origin] : [],
            },
          });
        },
      },
    },
    session: {
      create: {
        before: async (session, ctx) => {
          const origin =
            ctx?.request?.headers.get("origin") ??
            ctx?.request?.headers.get("referrer") ??
            null;

          if (!origin) {
            throw new APIError("FORBIDDEN", {
              message: "Missing origin header",
            });
          }

          const user = (await ctx?.context.internalAdapter.findUserById(
            session.userId,
          )) as UserWithSiteAccess | null;

          const siteAccess = (user?.siteAccess as string[]) ?? [];

          if (!siteAccess.includes(origin)) {
            throw new APIError("FORBIDDEN", {
              message: "This account is not authorized for this site",
            });
          }

          return { data: session };
        },
      },
    },
  },
});
