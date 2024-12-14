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


import { DTable } from "@/components/admin/table/products/table";
import { useEffect, useState } from "react";

import { Sneaker } from "@prisma/client";
import { WrapperTable } from "@/components/admin/table/wrapper-table";

import { columns } from "@/app/admin/products/(products)/columns";
import { useDataTable } from "@/hooks/stores/use-table-store";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/actions/product";


export function DataTable() {

  const onChangeLoading = useDataTable.use.onChangeLoading();
    const iSneakers: Sneaker[] = [];

    const queryKey = ["sneakers"]
    const {data, isLoading} = useQuery<Sneaker[]>({
        queryKey: queryKey,
        queryFn: ()=> getProducts(),
        initialData: iSneakers
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
      <WrapperTable filter="marque" table={table} color={"violet"} title={"Product sneakers"}  >
        <DTable table={table} columns={columns} />
      </WrapperTable>
    </div>
  )
}
