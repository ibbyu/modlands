import { NextResponse } from "next/server";
import { type NextRequest } from 'next/server'
import { getServerAuthSession } from "@/server/auth";
import { getModById } from "@/server/data/mod";
import { getTagByName } from "@/server/data/tag";
import { createTagOnMod, deleteTagOnMod } from "@/server/data/tag-on-mod";

export async function POST(request: NextRequest, { params: { id } }: { params: { id: string } }) {
  try {
    const session = await getServerAuthSession();

    const searchParams = request.nextUrl.searchParams;
    const name = searchParams.get('name');

    if (!name) {
      return NextResponse.json({ message: "Invalid tag name" }, { status: 400 });
    }

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const mod = await getModById(id);

    if (!mod) {
      return NextResponse.json({ message: "Mod not found" }, { status: 400 });
    }

    const tag = await getTagByName(name);

    if (!tag) {
      return NextResponse.json({ message: "Tag not found" }, { status: 400 });
    }

    await createTagOnMod(id, tag.id);

    console.log(`[INFO][POST_MOD_TAG] Mod tag added. Mod name: '${mod.name}', Tag name: '${tag.name}'`);

    return NextResponse.json({ message: "Tag added" }, { status: 200 });
  }
  catch (error) {
    console.log("[ERROR][POST_MOD_TAG]: ", error);

    return NextResponse.json({ message: "An unexpected error occurred" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params: { id } }: { params: { id: string } }) {
  try {
    const session = await getServerAuthSession();

    const searchParams = request.nextUrl.searchParams;
    const name = searchParams.get('name');

    if (!name) {
      return NextResponse.json({ message: "Invalid tag name" }, { status: 400 });
    }

    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const mod = await getModById(id);

    if (!mod) {
      return NextResponse.json({ message: "Mod not found" }, { status: 400 });
    }

    const tag = await getTagByName(name);

    if (!tag) {
      return NextResponse.json({ message: "Tag not found" }, { status: 400 });
    }

    await deleteTagOnMod(tag.id);

    console.log(`[INFO][DELETE_MOD_TAG] Mod tag deleted. Mod name: '${mod.name}', Tag name: '${tag.name}'`);

    return NextResponse.json({ message: "Tag removed" }, { status: 200 });
  }
  catch (error) {
    console.log("[ERROR][DELETE_MOD_TAG]: ", error);

    return NextResponse.json({ message: "An unexpected error occurred" }, { status: 500 });
  }
}