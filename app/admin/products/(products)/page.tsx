"use client"

import { columns } from "@/app/admin/products/(products)/columns";
import { IoMdAdd } from "react-icons/io"; 

import { Typographie } from "@/components/typographie";
import { DataTable } from "./data-table";
import { Footer } from "@/components/admin/table/footer";

import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Sneaker } from "@prisma/client";
import { useDataTable } from "@/hooks/use-store";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface TypeData {
    data: Sneaker[];
}

export default function Products() {

    const {onChangeLoading} = useDataTable();
    const sneakers: TypeData = {data: []};

    const queryKey = ["sneakers"]
    const {data, isLoading} = useQuery<TypeData>({
        queryKey: queryKey,
        queryFn: ()=> axios("/api/sneakers"),
        initialData: sneakers
    })

    useEffect(()=>{
        onChangeLoading(isLoading)
    },[isLoading, onChangeLoading])

    return (
        <main className='min-h-[calc(100vh-68px)] flex flex-col justify-between gap-y-4'>
            <header className="flex justify-between items-center p-4 pb-0">
                <Typographie component={"h1"} variant='h1' size="lg">Sneakers</Typographie>
                <Button asChild>
                    <Link href="/admin/products/add">
                        <IoMdAdd />
                        <span>Sneaker</span>
                    </Link>
                </Button>
            </header>
            <main className='w-full flex-grow px-4'>
                    <DataTable data={data.data} columns={columns} />
            </main>
            <Footer nbrSelect={0} />
        </main>
    )
}

