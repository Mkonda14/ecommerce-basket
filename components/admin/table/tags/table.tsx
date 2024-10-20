import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";

  import {
    flexRender,
} from "@tanstack/react-table"

import { Tag } from "@prisma/client";
import type { ColumnDef, Table as TableType } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MdAdd } from "react-icons/md";
import { LoaderSpin } from "@/components/loader-spin";
import { useDataTable } from "@/hooks/use-store";

interface DataTableProps{
    table: TableType<Tag>;
    columns: ColumnDef<Tag>[];
}


export const DTable = ({table, columns}:DataTableProps) => {

    const {isLoading} = useDataTable();

    return (
        <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-32 text-center"
                >
                  {isLoading ? <LoaderSpin className="mx-auto" /> : 
                    <Button className="space-x-2" asChild>
                      <Link href={"/admin/category/add"}>
                        <MdAdd className="h-5 w-5" /> <span>Create tag</span>
                      </Link>
                    </Button>
                  }
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    )
}
