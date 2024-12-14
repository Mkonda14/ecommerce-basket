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


import { DTable } from "@/components/admin/table/category-graffitis/table";
import { useEffect, useState } from "react";

import { WrapperTable } from "@/components/admin/table/wrapper-table";

import { CategoryGraffiti } from "@prisma/client"
import { columns } from "./columns";
import { useDataTable } from "@/hooks/stores/use-table-store";
import { useQuery } from "@tanstack/react-query";
import { getCategoryGraffitis } from "@/actions/graffiti/category";


export function DataTable() {

  const onChangeLoading = useDataTable.use.onChangeLoading();

  const categories: CategoryGraffiti[] = [];
  const queryKey = ["category-graffitis"]

  const {data, isLoading} = useQuery<CategoryGraffiti[]>({
      queryKey: queryKey,
      queryFn: ()=> getCategoryGraffitis(),
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
