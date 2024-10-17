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
} from "@tanstack/react-table"


import { DTable } from "@/components/admin/table/tags/table";
import { useState } from "react";

import type { ColumnDef } from "@tanstack/react-table";
import { WrapperTable } from "@/components/admin/table/wrapper-table";

import { Theme } from "@prisma/client"


interface DataTableProps{
  columns: ColumnDef<Theme>[];
  data?: Theme[];
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
      <WrapperTable table={table} color={"violet"} title={"Attribut tag"}  >
        <DTable table={table} columns={columns} />
      </WrapperTable>
    </div>
  )
}
