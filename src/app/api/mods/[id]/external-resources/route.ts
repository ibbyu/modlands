import { NextResponse } from "next/server";
import type { z } from "zod";

import { getServerAuthSession } from "@/server/auth";
import { updateExternalResourcesSchema } from "@/lib/validation/mod";
import { getModById } from "@/server/data/mod";
import { createExternalResource, updateExternalResource } from "@/server/data/external-resources";

export async function PATCH(request: Request, { params: { id } } : { params: { id: string } }) {
  try {
    const session = await getServerAuthSession();

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const json = await request.json() as z.infer<typeof updateExternalResourcesSchema>

    const { modExternalResourcesId, issues, source, wiki, discord  } = updateExternalResourcesSchema.parse(json);

    const mod = await getModById(id);

    if (!mod) {
      return NextResponse.json({ message: "Mod not found" }, { status: 404 });
    }

    if (mod.ownerId !== session.user.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    if (modExternalResourcesId) {
      await updateExternalResource(modExternalResourcesId, issues, source, wiki, discord);
    }
    else {
      await createExternalResource(id, issues, source, wiki, discord);
    }

    console.log(`[INFO][UPDATE_MOD_LINKS]: Mod links successfully updated. User: '${session.user.name}'`);

    return NextResponse.json({ message: "Mod links updated" }, { status: 200 });
  }
  catch (error) {
    console.log("[ERROR][UPDATE_MOD_LINKS]: ", error);

    return NextResponse.json({ message: "An unexpected error occurred" }, { status: 500 });
  }
}