"use server"
import { db } from "@/server/db";

export async function getTags() {
  return await db.query.tags.findMany();
}

export async function getTagByName(tagName: string) {
  return await db.query.tags.findFirst({
    where: (tags, { eq }) => eq(tags.name, tagName)
  });
}