"use client"

import * as React from "react"
import {
    ColumnDef
} from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"

import { Checkbox } from "@/components/ui/checkbox"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Theme } from "@prisma/client"
import { dateFormat } from "@/lib/utils"
import { BiMessageSquareEdit } from "react-icons/bi"
import Link from "next/link"
import { DropdownMenuItemDelete } from "@/components/admin/dropdown-menu-item-delete"
import { CldImgDynamic } from "@/components/cld-img-dynamic"

export const columns: ColumnDef<Theme>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => {
      const image: {publicId: string} = row.getValue("image");
      
      return (
        <CldImgDynamic size="cell-table" publicId={image.publicId} />
      )
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <div className="flex items-center gap-x-4">
          <span>Name</span>
          <Button
            variant="ghost"
            size={"icon"}
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )
    },
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("name")}</div>
    ),
  },
  
  {
    accessorKey: "_count",
    header: "Likes",
    cell: ({ row }) => {
      const like : {likes: number} = row.getValue("_count");
      return (
        <div className="capitalize">{like.likes}</div>
      )
    },
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => {
      const category : {name: string, secondName: string} = row.getValue("category");
      return (
        <div className="capitalize">{category?.secondName} / {category.name}</div>
      )
    },
  },
  {
    accessorKey: "popularity",
    header: "Popularity",
    cell: ({ row }) => {
      return (
        <div className="">{row.getValue("popularity")}</div>
      )
    },
  },
  {
    accessorKey: "createdAt",
    header: "Create At",
    cell: ({ row }) => {
      const date = dateFormat(row.getValue("createdAt"));
      return (
        <div className="capitalize">{date}</div>
      )
    },
  },
  {
    id: "actions",
    header: "Actions",
    enableHiding: false,
    cell: ({ row }) => {
      const theme = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(theme.id)}
            >
              Copy thème ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View thème details</DropdownMenuItem>
            <DropdownMenuItem>
              <Link className="flex items-center gap-x-4" href={`/admin/themes/update/${theme.id}`}> 
              <BiMessageSquareEdit className="size-4 mb-1" /> <span>Updated</span> </Link> 
            </DropdownMenuItem>
            <DropdownMenuItemDelete queryKey="themes" id={theme.id} />
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
