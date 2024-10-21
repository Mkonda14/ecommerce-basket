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

import { Category } from "@prisma/client"
import { InnerHTML } from "@/components/InnerHTML"
import Link from "next/link"

export const columns: ColumnDef<Category>[] = [
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
    accessorKey: "designer",
    header: "Designer",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("designer")}</div>
    ),
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => (
      <InnerHTML text={row.getValue("description")} />
    ),
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
      const date = new Date(row.getValue("createdAt")).toLocaleDateString('fr-FR');
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
      const category = row.original

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
              onClick={() => navigator.clipboard.writeText(category.id)}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View category details</DropdownMenuItem>
            <DropdownMenuItem className="text-red-500"> <Link href={`/admin/category/update/${category.id}`}>Updated</Link> </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
