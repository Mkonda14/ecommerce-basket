"use server"

import { Typographie } from "@/components/typographie";
import { DataTable } from "./data-table";
import { Footer } from "@/components/admin/table/footer";

import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { IoMdAdd } from "react-icons/io";
import { getTagSneakers } from "@/actions/product/tag";

export default async function Tags() {

    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ["tag-sneakers"],
        queryFn: ()=> getTagSneakers(),
    });  

    return (
        <main className='min-h-[calc(100vh-68px)] flex flex-col justify-between gap-y-4'>
            <header className="flex justify-between items-center p-4 pb-0">
                <Typographie component={"h1"} variant='h1' size="lg">Tags sneakers</Typographie>
                <Button asChild>
                    <Link href="/admin/tag-sneakers/add">
                        <IoMdAdd />
                        <span>Tag</span>
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

