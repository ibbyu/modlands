"use server"
import { db } from "@/server/db";
import { versions } from "@/server/db/schema";
import { v4 as uuidv4 } from 'uuid';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function createVersion(title: string, description: any, downloadUrl: string, modId: string, type: "PythonSDK" | "Text" | "BLCM", size: number) {
  await db.insert(versions).values({
    id: uuidv4(),
    title,
    description,
    downloadUrl,
    modId,
    type,
    size
  });
}