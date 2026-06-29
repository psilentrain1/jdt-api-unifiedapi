import { betterAuth } from "better-auth";
import { bearer } from "better-auth/plugins";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { client } from "./mongo.js";
import { origins } from "../common/globals.js";

// TODO: Fix this
const SIGNUP_ENABLED = process.env.SIGNUP_ENABLED === "1";

const db = client.db("auth");

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),
  emailAndPassword: {
    enabled: true,
  },
  plugins: [bearer()],
  session: {
    cookieCache: {
      enabled: false,
      signupEnabled: SIGNUP_ENABLED,
    },
  },
  trustedOrigins: origins,
});
