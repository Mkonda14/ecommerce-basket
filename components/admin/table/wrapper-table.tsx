
import { Button } from "@/components/ui/button";
import {Card, CardHeader, CardFooter, CardContent, CardTitle} from "@/components/ui/card";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Table } from "@tanstack/react-table";
import { ChevronDown } from "lucide-react";
import { FiSearch } from "react-icons/fi";


const colors = {
    emerald: "bg-emerald-200",
    cyan: "bg-cyan-200",
    violet: "bg-violet-200",
}

interface SectionTableProps{
    title: string;
    color: keyof typeof colors,
    children: React.ReactNode
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    table: Table<any>;
}

export const WrapperTable = ({color, title, table, children}: SectionTableProps) => {

    return (
        <Card>
            <CardHeader>
                <header className="w-full flex items-center justify-between">
                    <div className="w-full flex items-center gap-x-8">
                        <div className="flex items-center gap-x-4">
                            <div className={cn("h-8 w-3", colors[color])}></div>
                            <CardTitle>{title}</CardTitle>
                        </div>
                        <div className="flex items-center p-1 rounded-md bg-slate-100">          
                            <FiSearch className="h-5 w-5 text-gray-500" />       
                            <Input
                                placeholder="Search or type a command"
                                type="text"
                                className="border-none bg-transparent outline-none shadow-none focus-visible:ring-0"
                                value={(table.getColumn("marque")?.getFilterValue() as string) ?? ""}
                                onChange={(event) =>
                                  table.getColumn("marque")?.setFilterValue(event.target.value)
                                }
                            /> 
                            <Button variant={"outline"} className="bg-white text-slate-800 px-2 h-7">⌘ K</Button>
                        </div>        
                    </div>
                    {/* list columns */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="ml-auto">
                                Columns <ChevronDown className="ml-2 h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            {table
                            .getAllColumns()
                            .filter((column) => column.getCanHide())
                            .map((column) => {
                                return (
                                <DropdownMenuCheckboxItem
                                    key={column.id}
                                    className="capitalize"
                                    checked={column.getIsVisible()}
                                    onCheckedChange={(value) =>
                                    column.toggleVisibility(!!value)
                                    }
                                >
                                    {column.id}
                                </DropdownMenuCheckboxItem>
                                )
                            })}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </header>
            </CardHeader>
            <CardContent>
                {/* content table */}
                {children}
            </CardContent>
            <CardFooter>
                <div className="w-full flex items-center justify-end space-x-2 py-4">
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
            </CardFooter>
        </Card>
    )
}
