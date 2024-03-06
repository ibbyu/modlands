import { NextResponse } from "next/server";

import { getServerAuthSession } from "@/server/auth";
import { updateModSummarySchema } from "@/lib/validation/mod";
import { getModById, updateModSummaryById } from "@/server/data/mod";

export async function PATCH(request: Request, { params: { id } } : { params: { id: string } }) {
  try {
    const session = await getServerAuthSession();

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const json = await request.json() as { summary: string };
    const { summary } = updateModSummarySchema.parse(json);

    const mod = await getModById(id);

    if (!mod) {
      return NextResponse.json({ message: "Mod not found" }, { status: 404 });
    }

    if (mod.ownerId !== session.user.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await updateModSummaryById(id, summary);

    console.log(`[INFO][UPDATE_MOD_SUMMARY]: Mod summary successfully updated. User: '${session.user.name}'`);

    return NextResponse.json({ message: "Summary updated" }, { status: 200 });
  }
  catch (error) {
    console.log("[ERROR][UPDATE_MOD_SUMMARY]: ", error);

    return NextResponse.json({ message: "An unexpected error occurred" }, { status: 500 });
  }
}