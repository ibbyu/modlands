"use client"
import type { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge";

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
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => (<Badge variant="outline">{row.getValue("type")}</Badge>)
  },
  {
    accessorKey: "size",
    header: "Size",
  },
  {
    accessorKey: "downloads",
    header: "Downloads",
  },
];