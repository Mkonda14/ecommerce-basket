"use client"

import { columns } from "@/app/admin/tag/tags/columns";

import { Typographie } from "@/components/typographie";
import { DataTable } from "./data-table";
import { Footer } from "@/components/admin/table/footer";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Tag } from "@prisma/client";


export default function Tags() {

    const tags: Tag[] = [];
    const queryKey = ["tags"]

    const {data} = useQuery<Tag[]>({
        queryKey: queryKey,
        queryFn: ()=> axios("/api/tags"),
        initialData: tags
    })
    

    return (
        <main className='min-h-screen flex flex-col justify-between gap-y-4'>
            <Typographie component={"h1"} variant='h1' size="lg" className='p-4 pb-0'>Tag</Typographie>
            <main className='w-full flex-grow px-4'>
                    <DataTable data={data} columns={columns} />
            </main>
            <Footer nbrSelect={0} />
        </main>
    )
}

