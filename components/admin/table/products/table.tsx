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

import { Sneaker } from "@prisma/client";
import type { ColumnDef, Table as TableType } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MdAdd } from "react-icons/md";

interface DataTableProps{
    table: TableType<Sneaker>;
    columns: ColumnDef<Sneaker>[];
}


export const DTable = ({table, columns}:DataTableProps) => {

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
                  <Button className="space-x-2" asChild>
                    <Link href={"/admin/product/add"}>
                      <MdAdd className="h-5 w-5" /> <span>Create product</span>
                    </Link>
                  </Button>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    )
}
