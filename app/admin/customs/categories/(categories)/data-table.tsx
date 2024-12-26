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


import { DTable } from "@/components/admin/table/category-customs/table";
import { useEffect, useState } from "react";

import { WrapperTable } from "@/components/admin/table/wrapper-table";

import { CategoryCustom } from "@prisma/client"
import { columns } from "./columns";
import { useDataTable } from "@/hooks/stores/use-table-store";
import { useQuery } from "@tanstack/react-query";
import { getCategoryCustoms } from "@/actions/custom/category";


export function DataTable() {

  const onChangeLoading = useDataTable.use.onChangeLoading();

  const categories: CategoryCustom[] = [];
  const queryKey = ["category-customs"]

  const {data, isLoading} = useQuery<CategoryCustom[]>({
      queryKey: queryKey,
      queryFn: ()=> getCategoryCustoms(),
      initialData: categories
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
      <WrapperTable table={table} color={"violet"} title={"Thème catégorie"}  >
        <DTable table={table} columns={columns} />
      </WrapperTable>
    </div>
  )
}
