"use client"

import { columns } from "@/app/admin/tag-sneakers/(tags)/columns";

import { Typographie } from "@/components/typographie";
import { DataTable } from "./data-table";
import { Footer } from "@/components/admin/table/footer";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { TagSneaker } from "@prisma/client";
import { useDataTable } from "@/hooks/use-store";
import { useEffect } from "react";

interface TypeData {
    data: TagSneaker[];
}

export default function Tags() {

    const {onChangeLoading} = useDataTable();
    const tags: TypeData = {data:[]};
    const queryKey = ["tag-sneakers"]

    const {data, isLoading} = useQuery<TypeData>({
        queryKey: queryKey,
        queryFn: ()=> axios("/api/tag-sneakers"),
        initialData: tags
    })

    useEffect(()=>{
        onChangeLoading(isLoading)
    },[isLoading, onChangeLoading])
    

    return (
        <main className='min-h-[calc(100vh-68px)] flex flex-col justify-between gap-y-4'>
            <Typographie component={"h1"} variant='h1' size="lg" className='p-4 pb-0'>Tag</Typographie>
            <main className='w-full flex-grow px-4'>
                    <DataTable data={data.data} columns={columns} />
            </main>
            <Footer nbrSelect={0} />
        </main>
    )
}

