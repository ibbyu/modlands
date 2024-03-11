/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { NextResponse } from "next/server";
import { z  } from "zod";

import { getServerAuthSession } from "@/server/auth";
import { utapi } from "@/server/uploadthing";
import { versionContentSchema, MAX_FILE_SIZE } from "@/lib/validation/version";
import { createVersion } from "@/server/data/version";
import { getModById, updateModUpdateDateById } from "@/server/data/mod";

export async function POST(request: Request, { params: { id } } : { params: { id: string } }) {
  try {
    const session = await getServerAuthSession();

    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const data = await request.formData();
    const json = JSON.parse(data.get("json") as string) as { title: string, description: string, type: string }
    const file = data.get("file") as File;
    const { title, description, type } = versionContentSchema.parse(json);

    if (file.size >= MAX_FILE_SIZE) {
      return NextResponse.json({ message: "Mod file too big" }, { status: 400 });
    }

    const mod = await getModById(id);

    if (!mod) {
      return NextResponse.json({ message: "Mod not found" }, { status: 404 });
    }

    if (mod.ownerId !== session.user.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const response = await utapi.uploadFiles(file);
    if (Array.isArray(response)) {
      throw new Error("uploadthing response is an array");
    }

    if (response.error) {
      throw new Error("Failed to upload file to uploadthing");
    }
    
    const version = await createVersion(title, description, response.data.url, mod.id, type, file.size);

    await updateModUpdateDateById(mod.id);

    console.log(`[INFO][CREATE_VERSION]: Mod version created. User: '${session.user.name}'`);

    return NextResponse.json({ message: "Version created" }, { status: 200 });
  }
  catch (error) {
    console.log("[ERROR][CREATE_VERSION]: Failed to create mod version: ", error);

    return NextResponse.json({ message: "An unexpected error occurred" }, { status: 500 });
  }
}