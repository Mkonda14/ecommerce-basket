"use client"

import { columns } from "@/app/admin/themes/(themes)/columns";

import { Typographie } from "@/components/typographie";
import { DataTable } from "./data-table";
import { Footer } from "@/components/admin/table/footer";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Theme } from "@prisma/client";
import { useDataTable } from "@/hooks/use-store";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { IoMdAdd } from "react-icons/io";

interface TypeData {
    data: Theme[];
}

export default function Themes() {

    const {onChangeLoading} = useDataTable();
    const themes: TypeData = {data: []};
    const queryKey = ["themes"]

    const {data, isLoading} = useQuery<TypeData>({
        queryKey: queryKey,
        queryFn: ()=> axios("/api/themes"),
        initialData: themes
    })

    useEffect(()=>{
        onChangeLoading(isLoading)
    },[isLoading, onChangeLoading])
    
    return (
        <main className='min-h-[calc(100vh-68px)] flex flex-col justify-between gap-y-4'>
            <header className="flex justify-between items-center p-4 pb-0">
                <Typographie component={"h1"} variant='h1' size="lg">Thèmes</Typographie>
                <Button asChild>
                    <Link href="/admin/themes/add">
                        <IoMdAdd />
                        <span>Thème</span>
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

