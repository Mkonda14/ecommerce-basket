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
import { useEffect, useState } from "react";

import { WrapperTable } from "@/components/admin/table/wrapper-table";

import { Graffiti } from "@prisma/client"
import { columns } from "./columns";
import { useDataTable } from "@/hooks/stores/use-table-store";
import { useQuery } from "@tanstack/react-query";
import { getGraffitis } from "@/actions/graffiti";


export function DataTable() {

  const onChangeLoading = useDataTable.use.onChangeLoading();
  const themes: Graffiti[] = [];
  const queryKey = ["graffitis"]

  const {data, isLoading} = useQuery<Graffiti[]>({
      queryKey: queryKey,
      queryFn: ()=> getGraffitis(),
      initialData: themes
  })

  useEffect(()=>{
      onChangeLoading(isLoading)
  },[isLoading, onChangeLoading])

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
