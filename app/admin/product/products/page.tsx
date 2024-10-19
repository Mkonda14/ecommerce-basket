"use client"

import { columns } from "@/app/admin/product/products/columns";

import { Typographie } from "@/components/typographie";
import { DataTable } from "./data-table";
import { Footer } from "@/components/admin/table/footer";

import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Sneaker } from "@prisma/client";

interface TypeData {
    data: Sneaker[];
}

export default function Products() {

    const sneakers: TypeData = {data: []};

    const queryKey = ["products"]
    const {data} = useQuery<TypeData>({
        queryKey: queryKey,
        queryFn: ()=> axios("/api/products"),
        initialData: sneakers
    })

    return (
        <main className='min-h-[calc(100vh-68px)] flex flex-col justify-between gap-y-4'>
            <Typographie component={"h1"} variant='h1' size="lg" className='p-4 pb-0'>Sneakers</Typographie>
            <main className='w-full flex-grow px-4'>
                    <DataTable data={data.data} columns={columns} />
            </main>
            <Footer nbrSelect={0} />
        </main>
    )
}

