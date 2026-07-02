import { betterAuth } from "better-auth";
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
  },
});
