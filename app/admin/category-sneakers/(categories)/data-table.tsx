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


import { DTable } from "@/components/admin/table/category-sneakers/table";
import { useEffect, useState } from "react";

import { WrapperTable } from "@/components/admin/table/wrapper-table";

import { CategorySneaker } from "@prisma/client"
import { columns } from "@/app/admin/category-sneakers/(categories)/columns";
import { useDataTable } from "@/hooks/stores/use-table-store";
import { useQuery } from "@tanstack/react-query";
import { getCategorySneakers } from "@/actions/category-attribut";


export function DataTable() {

  const onChangeLoading = useDataTable.use.onChangeLoading();

  const categories: CategorySneaker[] = [];
  const queryKey = ["category-sneakers"]

  const {data, isLoading} = useQuery<CategorySneaker[]>({
      queryKey: queryKey,
      queryFn: ()=> getCategorySneakers(),
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
      <WrapperTable table={table} color={"violet"} title={"Product catégorie"}  >
        <DTable table={table} columns={columns} />
      </WrapperTable>
    </div>
  )
}
