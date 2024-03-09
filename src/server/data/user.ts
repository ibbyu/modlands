"use server"
import { db } from "@/server/db";
import { users } from "@/server/db/schema";
import { v4 as uuidv4 } from 'uuid';

export async function getUserByUsername(username: string) {
  return await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.name, username)
  });
}

export async function getUserByEmail(email: string) {
  return await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.email, email)
  });
}

export async function createUser(username: string, email: string, hashedPassword: string) {
  await db.insert(users).values({
    id: uuidv4(),
    name: username,
    email: email,
    password: hashedPassword,
    emailVerified: null,
  });
}

export async function getUserByUsernameWithMods(username: string) {
  return await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.name, username),
    with: {
      mods: true
    }
  });
}