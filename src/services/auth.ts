import { betterAuth } from "better-auth";
import { bearer } from "better-auth/plugins";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { client } from "./mongo.js";
import { origins } from "../common/globals.js";

// TODO: Verify this is working
const SIGNUP_ENABLED = process.env.SIGNUP_ENABLED === "1";

const db = client.db("auth");

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),
  emailAndPassword: {
    enabled: true,
  },
  session: {
    cookieCache: {
      enabled: true,
      signupEnabled: SIGNUP_ENABLED,
    },
  },
  trustedOrigins: origins,
  user: {
    additionalFields: {
      siteAccess: {
        type: "string[]",
        default: [],
        required: true,
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
        before: async (user, ctx) => {
          const origin =
            ctx?.request?.headers.get("origin") ??
            ctx?.request?.headers.get("referrer") ??
            null;

          return {
            data: {
              ...user,
              siteAccess: origin ? [origin] : [],
            },
          };
        },
      },
    },
  },
});
