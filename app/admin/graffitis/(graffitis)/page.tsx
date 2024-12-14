"use server"

import { Typographie } from "@/components/typographie";
import { DataTable } from "./data-table";
import { Footer } from "@/components/admin/table/footer";

import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { IoMdAdd } from "react-icons/io";
import { getGraffitis } from "@/actions/graffiti";

export default async function Graffitis() {

    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ['graffitis'],
        queryFn: ()=> getGraffitis(),
    });
    
    return (
        <main className='min-h-[calc(100vh-68px)] flex flex-col justify-between gap-y-4'>
            <header className="flex justify-between items-center p-4 pb-0">
                <Typographie component={"h1"} variant='h1' size="lg">Graffitis</Typographie>
                <Button asChild>
                    <Link href="/admin/graffitis/add">
                        <IoMdAdd />
                        <span>Graffiti</span>
                    </Link>
                </Button>
            </header>
            <main className='w-full flex-grow px-4'>
                <HydrationBoundary state={dehydrate(queryClient)}>
                    <DataTable /> 
                </HydrationBoundary>
            </main>
            <Footer nbrSelect={0} />
        </main>
    )
}

