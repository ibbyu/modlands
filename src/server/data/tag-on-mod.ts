"use server"
import { db } from "@/server/db";
import { tagOnMods } from "../db/schema";
import { eq } from "drizzle-orm";

export async function createTagOnMod(modId: string, tagId: string) {
  await db.insert(tagOnMods).values({
    modId,
    tagId
  });
}

export async function deleteTagOnMod(id: string) {
  await db.delete(tagOnMods).where(eq(tagOnMods.tagId, id));
}