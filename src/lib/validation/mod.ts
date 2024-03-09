import { z } from "zod";

export const createModSchema = z.object({
  name: z.string({ errorMap: (issue, ctx) => ({ message: 'Please enter a name' })}).min(3, { message: "Name must be longer than 3 characters"}),
  summary: z.string()
});

export const updateModSummarySchema = z.object({
  summary: z.string().min(1, { message: "Summary required"})
});

export const updateDescriptionSchema = z.object({
  description: z.any()
});

export const updateExternalResourcesSchema = z.object({
  modExternalResourcesId: z.string().nullish(),
  issues: z.string().url().optional().or(z.literal('')),
  source: z.string().url().optional().or(z.literal('')),
  wiki: z.string().url().optional().or(z.literal('')),
  discord: z.string().url().optional().or(z.literal(''))
});