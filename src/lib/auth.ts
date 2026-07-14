import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { jwt } from "better-auth/plugins";
import { APIError, createAuthMiddleware } from "better-auth/api";

const client = new MongoClient(process.env.MONGODB_URI!);
const db = client.db("karushala_db");

const DEMO_EMAILS = ["demo@karushala.com", "demo@example.com", "test@karushala.com"];

export const auth = betterAuth({
  database: mongodbAdapter(db),
  emailAndPassword: {
    enabled: true
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
    }
  },

  account: {
    accountLinking: {
      enabled: true,
     
    }
  },
  session: {
    cookieCache: {
      enabled: true,
      strategy: "jwt",
      maxAge: 7 * 24 * 60 * 60
    }
  },
  plugins: [
    jwt()
  ],

  hooks: {
    before: createAuthMiddleware(async (ctx) => {
      if (ctx.path === "/change-password") {
        const email = ctx.context.session?.user?.email?.toLowerCase();
        if (email && DEMO_EMAILS.includes(email)) {
          throw new APIError("FORBIDDEN", {
            message: "Demo users cannot change password.",
          });
        }
      }
    }),
  },
});