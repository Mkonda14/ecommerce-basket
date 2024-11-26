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
  
import { BiMessageSquareEdit } from "react-icons/bi"; 

import { CategorySneaker } from "@prisma/client"
import { InnerHTML } from "@/components/InnerHTML"
import Link from "next/link"
import { dateFormat } from "@/lib/utils"
import { DropdownMenuItemDelete } from "@/components/admin/dropdown-menu-item-delete"

export const columns: ColumnDef<CategorySneaker>[] = [
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
              Copy category ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem><Link className="flex items-center gap-x-3" href={`/admin/category-sneakers/update/${category.id}`}> <BiMessageSquareEdit className="size-4 mb-1" /> <span>Updated</span> </Link> </DropdownMenuItem>
            
            <DropdownMenuItemDelete queryKey="category-sneakers" id={category.id} />
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
