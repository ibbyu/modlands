import { z } from "zod";

export const MAX_FILE_SIZE = 20_000_000;

/* eslint-disable @typescript-eslint/no-unsafe-member-access */
export const createVersionSchema = z.object({
  title: z.string().min(3),
  description: z.string(),
  type: z.enum(["PythonSDK", "Text", "BLCM"]),
  file: z.any()
  .refine((file) => file !== undefined, "File required")
  .refine((file) => file?.size <= MAX_FILE_SIZE, "Max file size is 20 MB")
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  //.refine((file) => file.name.split(".") !== "tmod", "Only '.tmod' files are supported")
});

export const versionContentSchema = z.object({
  title: z.string().min(3),
  description: z.string(),
  type: z.enum(["PythonSDK", "Text", "BLCM"])
});