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


import { DTable } from "@/components/admin/table/themes/table";
import { useEffect, useState } from "react";

import { WrapperTable } from "@/components/admin/table/wrapper-table";

import { Theme } from "@prisma/client"
import { useDataTable } from "@/hooks/stores/use-table-store";

import { useQuery } from "@tanstack/react-query";
import { getThemeCards } from "@/actions/category-attribut";
import { columns } from "@/app/admin/themes/(themes)/columns";



export function DataTable() {

  const onChangeLoading = useDataTable.use.onChangeLoading();
    const themes: Theme[]= [];
    const queryKey = ["themes"]

    const {data, isLoading} = useQuery<Theme[]>({
        queryKey: queryKey,
        queryFn: ()=> getThemeCards(),
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
      <WrapperTable table={table} color={"violet"} title={"Attribut thèmes"}  >
        <DTable table={table} columns={columns} />
      </WrapperTable>
    </div>
  )
}
