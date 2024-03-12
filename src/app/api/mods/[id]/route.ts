import { NextResponse } from "next/server";

import { getServerAuthSession } from "@/server/auth";
import { utapi } from "@/server/uploadthing";
import { getModById, deleteModById } from "@/server/data/mod";

export async function DELETE(request: Request, { params: { id } } : { params: { id: string } }) {
  try {
    const session = await getServerAuthSession();

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const mod = await getModById(id);

    if (!mod) {
      return NextResponse.json({ message: "Mod not found" }, { status: 404 });
    }

    if (mod.ownerId !== session.user.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    if (mod.icon) {
      const pathSegments = new URL(mod.icon).pathname.split('/');

      const key = pathSegments[pathSegments.length - 1];

      await utapi.deleteFiles(key!);
    }

    await deleteModById(id);

    console.log(`[INFO][DELETE_MOD]: Mod successfully deleted. User: '${session.user.name}'`);

    return NextResponse.json({ message: "Mod deleted" }, { status: 200 });
  }
  catch (error) {
    console.log("[ERROR][DELETE_MOD]: ", error);

    return NextResponse.json({ message: "An unexpected error occurred" }, { status: 500 });
  }
}