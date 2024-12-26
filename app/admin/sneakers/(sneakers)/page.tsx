"use server"

import { IoMdAdd } from "react-icons/io"; 

import { Typographie } from "@/components/typographie";
import { DataTable } from "./data-table";
import { Footer } from "@/components/admin/table/footer";

import { Button } from "@/components/ui/button";
import Link from "next/link";

import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { getProducts } from "@/actions/product";


export default async function Products() {

    const queryClient = new QueryClient()

    await queryClient.prefetchQuery({
        queryKey: ['sneakers'],
        queryFn: ()=> getProducts(),
    })

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
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
                        <DataTable />
                </main>
                <Footer nbrSelect={0} />
            </main>
        </HydrationBoundary>
    )
}

