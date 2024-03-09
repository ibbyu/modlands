/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { NextResponse } from "next/server";

import { getServerAuthSession } from "@/server/auth";
import { updateDescriptionSchema } from "@/lib/validation/mod";
import { getModById, updateModDescriptionById } from "@/server/data/mod";

export async function PATCH(request: Request, { params: { id } } : { params: { id: string } }) {
  try {
    const session = await getServerAuthSession();

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const json = await request.json() as { description: string };
    const { description } = updateDescriptionSchema.parse(json);

    const mod = await getModById(id);

    if (!mod) {
      return NextResponse.json({ message: "Mod not found" }, { status: 404 });
    }

    if (mod.ownerId !== session.user.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await updateModDescriptionById(id, description);

    console.log(`[INFO][UPDATE_MOD_DESCRIPTION]: Mod description successfully updated. By: '${session.user.name}', Mod name: '${mod.name}'.`);

    return NextResponse.json({ message: "Description updated" }, { status: 200 });
  }
  catch (error) {
    console.log("[ERROR][UPDATE_MOD_DESCRIPTION]: ", error);

    return NextResponse.json({ message: "An unexpected error occurred" }, { status: 500 });
  }
}