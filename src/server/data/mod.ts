"use server"
import { db } from "@/server/db";
import { mods } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { v4 as uuidv4 } from 'uuid';
import { desc  } from 'drizzle-orm';

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

export async function updateModSummaryById(id: string, summary: string) {
  await db.update(mods).set({ summary }).where(eq(mods.id, id));
}

export async function getModsByQueryNameIncludeOwnerIncludeTagOnMod(limit: number, query?: string,  orderBy?: string) {
  if (orderBy === "recent") {
    return await db.query.mods.findMany({
      limit,
      where: query ? (mods, { like }) => like(mods.name, `%${query}%`) : undefined,
      orderBy: (mods, { desc }) => [desc(mods.updatedAt)],
      with: {
        owner: true,
        tags: {
          with: {
            tag: true
          }
        }
      }
    });
  }

  if (orderBy === "popular") {
    return await db.query.mods.findMany({
      limit,
      where: query ? (mods, { like }) => like(mods.name, `%${query}%`) : undefined,
      orderBy: (mods, { desc }) => [desc(mods.downloads)],
      with: {
        owner: true,
        tags: {
          with: {
            tag: true
          }
        }
      }
    });
  }

  return await db.query.mods.findMany({
    limit,
    where: query ? (mods, { like }) => like(mods.name, `%${query}%`) : undefined,
    with: {
      owner: true,
      tags: {
        with: {
          tag: true
        }
      }
    }
  });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function updateModDescriptionById(id: string, description: any) {
  void await db.update(mods).set({ description }).where(eq(mods.id, id));
}

export async function getModBySlugWithOwner(slug: string) {
  return await db.query.mods.findFirst({
    where: (mods, { eq }) => eq(mods.slug, slug),
    with: {
      owner: true
    }
  });
}

export async function getModBySlugWithOwnerWithExternalResources(slug: string) {
  return await db.query.mods.findFirst({
    where: (mods, { eq }) => eq(mods.slug, slug),
    with: {
      owner: true,
      modExternalResources: true
    }
  });
}

export async function getModBySlugExternalResources(slug: string) {
  return await db.query.mods.findFirst({
    where: (mods, { eq }) => eq(mods.slug, slug),
    with: {
      modExternalResources: true
    }
  });
}

export async function getModBySlugExternalResourcesWithTags(slug: string) {
  return await db.query.mods.findFirst({
    where: (mods, { eq }) => eq(mods.slug, slug),
    with: {
      modExternalResources: true,
      tags: true
    }
  });
}

export async function updateModIconById(id: string, icon: string) {
  void await db.update(mods).set({ icon }).where(eq(mods.id, id));
}

export async function updateModUpdateDateById(id: string) {
  void await db.update(mods).set({ updatedAt: new Date() }).where(eq(mods.id, id));
}

export async function getModBySlugWithVersions(slug: string) {
  return await db.query.mods.findFirst({
    where: (mods, { eq }) => eq(mods.slug, slug),
    with: {
      versions: {
        orderBy: (versions, { desc }) => [desc(versions.published)],
      }
    }
  });
}