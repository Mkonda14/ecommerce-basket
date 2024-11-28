"use client"

import { columns } from "@/app/admin/category-sneakers/(categories)/columns";

import { Typographie } from "@/components/typographie";
import { DataTable } from "./data-table";
import { Footer } from "@/components/admin/table/footer";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { CategorySneaker } from "@prisma/client";
import { useDataTable } from "@/hooks/stores/use-table-store";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { IoMdAdd } from "react-icons/io";

interface TypeData {
    data: CategorySneaker[];
}


export default function Categories() {

    const onChangeLoading = useDataTable.use.onChangeLoading();

    const categories: TypeData = {data: []};
    const queryKey = ["category-sneakers"]

    const {data, isLoading} = useQuery<TypeData>({
        queryKey: queryKey,
        queryFn: ()=> axios("/api/category-sneakers"),
        initialData: categories
    })

    useEffect(()=>{
        onChangeLoading(isLoading)
    },[isLoading, onChangeLoading])

    
    return (
        <main className='min-h-[calc(100vh-68px)] flex flex-col justify-between gap-y-4'>
            <header className="flex justify-between items-center p-4 pb-0">
                <Typographie component={"h1"} variant='h1' size="lg">Catégories</Typographie>
                <Button asChild>
                    <Link href="/admin/category-sneakers/add">
                        <IoMdAdd />
                        <span>Category</span>
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

