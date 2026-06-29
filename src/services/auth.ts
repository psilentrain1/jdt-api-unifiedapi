import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { client } from "./mongo.js";
import { origins } from "../common/globals.js";

const SIGNUP_ENABLED = process.env.SIGNUP_ENABLED === "1";

const db = client.db();

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),
  collectionPrefix: "btath",
  emailAndPassword: {
    enabled: true,
  },
  session: {
    cookieCache: {
      enabled: false,
      signupEnabled: SIGNUP_ENABLED,
    },
  },
  trustedOrigins: origins,
});
