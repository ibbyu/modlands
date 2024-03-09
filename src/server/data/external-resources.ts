"use server"
import { db } from "@/server/db";
import { modExternalResources } from "@/server/db/schema";
import { eq } from "drizzle-orm/sql";
import { v4 as uuidv4 } from 'uuid';

export async function createExternalResource(modId: string, issues?: string, source?: string, wiki?: string, discord?: string) {
  await db.insert(modExternalResources).values({
    id: uuidv4(),
    issues,
    source,
    wiki,
    discord,
    modId
  });
}

export async function updateExternalResource(modExternalResourcesId: string, issues?: string, source?: string, wiki?: string, discord?: string) {
  void await db.update(modExternalResources).set({ issues, source, wiki, discord }).where(eq(modExternalResources.id, modExternalResourcesId));
}