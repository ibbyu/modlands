import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

import { getServerAuthSession } from "@/server/auth";

const f = createUploadthing();
 
export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "4MB" } })
    .middleware(async ({ req }) => {
      const session = await getServerAuthSession();
      
      if (!session) 
        throw new UploadThingError("Unauthorized");
 
      return {};
    })
    .onUploadComplete(async ({ metadata, file }) => ({ uploadedBy: metadata })),
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;