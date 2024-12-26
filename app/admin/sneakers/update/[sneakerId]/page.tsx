"use server"

import { Typographie } from '@/components/typographie'
import { FormSneaker } from '@/app/admin/sneakers/form-sneaker'
import { getSneakerUpdatedById } from '@/actions/product';

import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { getCategorySneakers } from '@/actions/product/category'
import { getTagSneakers} from '@/actions/product/tag'


interface SneakerUpdateProps{
    params:{
        sneakerId: string
    }
}

export default async function SneakerUpdate({params}: SneakerUpdateProps) {

    const queryClient = new QueryClient()

    await queryClient.prefetchQuery({
        queryKey: ['categories'],
        queryFn: ()=> getCategorySneakers(),
    })

    await queryClient.prefetchQuery({
        queryKey: ['tags'],
        queryFn: ()=> getTagSneakers(),
    })

    // Get sneaker by ID and populate form with data
    
    const sneaker = await getSneakerUpdatedById(params.sneakerId);
    if (!sneaker) {
        return (
            <p className='text-center text-2xl'>Page not found</p>
        )
    }

    return (
        <main className=''>
            <Typographie component={"h1"} variant='h1' size="lg" className='p-4'>Updated category</Typographie>
            <main className='w-full'>
                <HydrationBoundary state={dehydrate(queryClient)}>
                    <FormSneaker sneakerId={params.sneakerId} sneaker={sneaker} />
                </HydrationBoundary>
            </main>
        </main>
    )
}