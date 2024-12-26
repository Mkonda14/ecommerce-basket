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

import { CellBool } from "@/components/admin/table/cell-bool"
import { BiMessageSquareEdit } from "react-icons/bi"
import Link from "next/link"
import { DropdownMenuItemDelete } from "@/components/admin/dropdown-menu-item-delete"
import { CldImgDynamic } from "@/components/cld-img-dynamic"
import { TtransToItemList } from "@/actions/translate"

export const columns: ColumnDef<TtransToItemList>[] = [
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
    accessorKey: "publicId",
    header: "Image",
    cell: ({ row }) => {      
      return (
        <CldImgDynamic size="cell-table" publicId={row.getValue("publicId")} />
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
    accessorKey: "price",
    header: () => <div className="">Price</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("price"))

      // Format the amount as a dollar amount
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount)

      return <div className="font-medium">{formatted}</div>
    },
  },
  {
    accessorKey: "isCustom",
    header: "Customizable",
    cell: ({ row }) => {
      return (
        <CellBool isTrue={row.getValue("isCustom")} />
      )
    },
  },
  {
    accessorKey: "marque",
    header: "Marque",
    cell: ({ row }) => {
      return (
        <div className="capitalize">{row.getValue("marque")}</div>
      )
    },
  },
  {
    accessorKey: "model",
    header: "Model",
    cell: ({ row }) => {
      return (
        <div className="capitalize">{row.getValue("model")}</div>
      )
    },
  },
  {
    accessorKey: "colorPrimary",
    header: "color primary",
    cell: ({ row }) => {
      const colorPrimary : {name: string, code: string, quantity: string} = row.getValue("colorPrimary");
      return (
        <div className="flex gap-x-4">
          <span className="h-6 w-6 rounded-full" style={{backgroundColor: colorPrimary.code}}></span>
          <span className="space-x-4"> <span>Q:</span><span className="font-semibold">{colorPrimary.quantity}</span></span>
        </div>
      )
    },
  },
  {
    id: "actions",
    header: "Actions",
    enableHiding: false,
    cell: ({ row }) => {
      const custom = row.original

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
              onClick={() => navigator.clipboard.writeText(custom.id)}
            >
              Copy custom ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View sneaker details</DropdownMenuItem>
            <DropdownMenuItem><Link className="flex items-center gap-x-4" href={`/admin/customs/update/${custom.id}`}> <BiMessageSquareEdit className="size-4 mb-1" /> <span>Updated</span> </Link> </DropdownMenuItem>
            <DropdownMenuItemDelete queryKey="customs-list" id={custom.id} />
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
