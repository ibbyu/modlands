"use server"
import { db } from "@/server/db";
import { mods } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { v4 as uuidv4 } from 'uuid';

export async function getModBySlug(slug: string) {
  return await db.query.mods.findFirst({
    where: (mods, { eq }) => eq(mods.slug, slug)
  });
}

export async function getModById(id: string) {
  return await db.query.mods.findFirst({
    where: (mods, { eq }) => eq(mods.id, id)
  });
}

export async function createMod(name: string, slug: string, ownerId: string, summary: string) {
  await db.insert(mods).values({
    id: uuidv4(),
    name,
    slug,
    ownerId,
    summary,
  })
}

export async function deleteModById(id: string) {
  await db.delete(mods).where(eq(mods.id, id));
}