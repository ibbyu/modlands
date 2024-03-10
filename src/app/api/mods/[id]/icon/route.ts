import { NextResponse } from "next/server";

import { getServerAuthSession } from "@/server/auth";
import { updateIconSchema } from "@/lib/validation/mod";
import { utapi } from "@/server/uploadthing";
import { getModById, updateModIconById } from "@/server/data/mod";

export async function PATCH(request: Request, { params: { id } } : { params: { id: string } }) {
  try {
    const session = await getServerAuthSession();

    if (!session) {
      console.log("[INFO][UPDATE_MOD_ICON]: Update mod icon failed. User is not authenticated.");

      return new NextResponse("Unauthorized", { status: 401 });
    }

    const json = await request.json() as { imageUrl: string };
    const { icon } = updateIconSchema.parse(json);
    
    const mod = await getModById(id);

    if (!mod) {
      console.log(`[INFO][UPDATE_MOD_ICON]: Update mod icon failed. Mod not found. Mod id '${id}', User: '${session.user.name}'`);

      return NextResponse.json({ message: "Mod not found" }, { status: 404 });
    }

    if (mod.ownerId !== session.user.id) {
      console.log(`[INFO][UPDATE_MOD_ICON]: Update mod icon failed. User does not own this mod. Mod name '${mod.name}', User: '${session.user.name}'`);

      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    if (mod.icon) {
      const pathSegments = new URL(mod.icon).pathname.split('/');
  
      const key = pathSegments[pathSegments.length - 1];
      
      await utapi.deleteFiles(key!);
    }

    await updateModIconById(id, icon);

    console.log(`[INFO][UPDATE_MOD_ICON]: Mod icon successfully updated. User: '${session.user.name}'`);

    return NextResponse.json({ message: "Mod icon updated" }, { status: 200 });
  }
  catch (error) {
    console.log("[ERROR][UPDATE_MOD_ICON]: ", error);

    return NextResponse.json({ message: "An unexpected error occurred" }, { status: 500 });
  }
}