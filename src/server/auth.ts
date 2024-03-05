import { DrizzleAdapter } from "@auth/drizzle-adapter";
import {
  getServerSession,
  type NextAuthOptions,
} from "next-auth";
import { type Adapter } from "next-auth/adapters";
import DiscordProvider from "next-auth/providers/discord";

import { env } from "@/env";
import { db } from "@/server/db";
import { createTable } from "@/server/db/schema";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/sign-in"
  },
  session: {
    strategy: "jwt"
  },
  callbacks: {
    session: ({ session, token }) => ({
      ...session,
      user: {
        ...session.user,
        id: token.id,
        createdAt: token.createdAt,
        name: token.name,
      },
    }),
    jwt: ({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.image = user.image;
        token.createdAt = user.createdAt;
      }
      
      return token;
    }
  },
  adapter: DrizzleAdapter(db, createTable) as Adapter,
  providers: [
    DiscordProvider({
      clientId: env.DISCORD_CLIENT_ID,
      clientSecret: env.DISCORD_CLIENT_SECRET,
    }),
    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
  ]
};

export const getServerAuthSession = () => getServerSession(authOptions);
