import { DrizzleAdapter } from "@auth/drizzle-adapter";
import {
  getServerSession,
  type NextAuthOptions,
} from "next-auth";
import { type Adapter } from "next-auth/adapters";
import DiscordProvider from "next-auth/providers/discord";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

import { env } from "@/env";
import { db } from "@/server/db";
import { createTable } from "@/server/db/schema";
import { getUserByUsername } from "@/server/data/user";
import { signInSchema } from "@/lib/validation/user";

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
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "username", type: "text" },
        password: { label: "password", type: "password" }
      },
      async authorize(credentials) {
        const { username, password } = signInSchema.parse(credentials);

        const user = await getUserByUsername(username);

        if (!user) {
          console.log(`[INFO]: Sign in failed, account does not exist. Username: '${username}'`);
          return null;
        }

        const match = await bcrypt.compare(password, user.password!);

        if (!match) {
          console.log(`[INFO]: Sign in failed, incorrect password. Username: '${username}'`)
          return null;
        }

        console.log(`[INFO]: Sign in success, Username: '${username}'`);

        return user;
      }
    })
  ]
};

export const getServerAuthSession = () => getServerSession(authOptions);
