"use client"
import type { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { cn, formatBytes } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export type Version = {
  id: string;
  type: "PythonSDK" | "Text" | "BLCM";
  description: unknown;
  downloads: number;
  modId: string;
  title: string;
  downloadUrl: string;
  published: Date;
  size: number;
}

export const columns: ColumnDef<Version>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="w-[200px] truncate font-medium">
            {row.getValue("title")}
          </span>
        </div>
      )
    }
  },
  {
    accessorKey: "published",
    header: "Published",
    cell: ({ row }) => (
      <div className="w-12">{new Date(row.getValue("published")).toLocaleDateString()}</div>
    ),
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => (<Badge variant="outline">{row.getValue("type")}</Badge>)
  },
  {
    accessorKey: "size",
    header: "Size",
    cell: ({ row }) => (
      <div className="w-12">{formatBytes(row.getValue("size"))}</div>
    ),
  },
  {
    accessorKey: "downloads",
    header: "Downloads",
  },
  {
    accessorKey: "downloadUrl",
    header: "Link",
    cell: ({ row }) => (
      <Link href={row.getValue("downloadUrl")} target="_blank" className={cn(buttonVariants({ variant: "link" }), "p-0")}>Download</Link>
    ),
  },
];