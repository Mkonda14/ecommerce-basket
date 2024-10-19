"use client"

import { columns } from "@/app/admin/category/categories/columns";

import { Typographie } from "@/components/typographie";
import { DataTable } from "./data-table";
import { Footer } from "@/components/admin/table/footer";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Category } from "@prisma/client";
import { useDataTable } from "@/hooks/use-store";

interface TypeData {
    data: Category[];
}


export default function Categories() {

    const categories: TypeData = {data: []};
    const queryKey = ["categories"]

    const {data, isLoading} = useQuery<TypeData>({
        queryKey: queryKey,
        queryFn: ()=> axios("/api/categories"),
        initialData: categories
    })

    useDataTable((state)=> state.onChangeLoading(isLoading))

    console.log(data, "categories");
    
    return (
        <main className='min-h-[calc(100vh-68px)] flex flex-col justify-between gap-y-4'>
            <Typographie component={"h1"} variant='h1' size="lg" className='p-4 pb-0'>Catégorie</Typographie>
            <main className='w-full flex-grow px-4'>
                    <DataTable data={data.data} columns={columns} />
            </main>
            <Footer nbrSelect={0} />
        </main>
    )
}

