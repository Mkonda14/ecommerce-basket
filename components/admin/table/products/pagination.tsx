
import { Button } from "@/components/ui/button"
import { Payment } from "./data";
import { Table } from "@tanstack/react-table";

interface PaginationProps{
    table: Table<Payment>;
}


export const Pagination = ({table}:PaginationProps) => {
    return (
        <div className="flex items-center justify-end space-x-2 py-4 bg-violet-500">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    )
}
