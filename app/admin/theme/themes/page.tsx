"use client"

import { columns } from "@/app/admin/theme/themes/columns";

import { Typographie } from "@/components/typographie";
import { DataTable } from "./data-table";
import { Footer } from "@/components/admin/table/footer";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Theme } from "@prisma/client";


export default function Themes() {

    const themes: Theme[] = [];
    const queryKey = ["themes"]

    const {data} = useQuery<Theme[]>({
        queryKey: queryKey,
        queryFn: ()=> axios("/api/tags"),
        initialData: themes
    })
    

    return (
        <main className='min-h-screen flex flex-col justify-between gap-y-4'>
            <Typographie component={"h1"} variant='h1' size="lg" className='p-4 pb-0'>Thèmes</Typographie>
            <main className='w-full flex-grow px-4'>
                    <DataTable data={data} columns={columns} />
            </main>
            <Footer nbrSelect={0} />
        </main>
    )
}

