import { NextResponse } from "next/server";

import { getServerAuthSession } from "@/server/auth";
import { createModSchema } from "@/lib/validation/mod";
import { createMod, getModBySlug } from "@/server/data/mod";

export async function POST(request: Request) {
  try {
    const session = await getServerAuthSession();

    if (!session) {
      console.log("[INFO][CREATE_MOD]: Failed to create mod. User is not logged in");

      return NextResponse.json({ errorMessage: "You need to be logged in to perform this action" }, { status: 401 });
    }

    const json = await request.json() as { name: string, summary: string };
    const { name, summary } = createModSchema.parse(json);

    const slug = name.replace(/\s+/g, '-').toLowerCase(); // TODO: move to util function

    const mod = await getModBySlug(slug);
  
    if (mod) {
      console.log(`[INFO][CREATE_MOD]: Failed to create mod. Mod already exists. User: '${session.user.name}', Mod name: '${name}'`);

      return NextResponse.json({ errorMessage: "This project already exists" }, { status: 400 });
    }
  
    await createMod(name, slug, session.user.id, summary);
    
    console.log(`[INFO][CREATE_MOD]: Mod successfully created. User: '${session.user.name}', Mod name: '${name}'`);

    return NextResponse.json({ slug }, { status: 200 });
  }
  catch(error) {
    console.log("[ERROR][CREATE_MOD]: ", error);

    return NextResponse.json({ errorMessage: "An unexpected error occurred" }, { status: 500 });
  }
}