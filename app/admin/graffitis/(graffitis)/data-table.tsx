"use client"

import {
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";


import { DTable } from "@/components/admin/table/graffitis/table";
import { useState } from "react";

import type { ColumnDef } from "@tanstack/react-table";
import { WrapperTable } from "@/components/admin/table/wrapper-table";

import { Graffiti } from "@prisma/client"


interface DataTableProps{
  columns: ColumnDef<Graffiti>[];
  data?: Graffiti[];
}


export function DataTable({columns, data = []}: DataTableProps) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <div className="w-full">
      <WrapperTable table={table} color={"violet"} title={"Attribut graffiti"}  >
        <DTable table={table} columns={columns} />
      </WrapperTable>
    </div>
  )
}
