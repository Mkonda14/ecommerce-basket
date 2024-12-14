"use server"

import { Typographie } from '@/components/typographie'
import { FormProduct } from '@/app/admin/products/form-product'
import { getProductById } from '@/actions/product';

import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { getCategorySneakers, getTagSneakers, getThemes } from '@/actions/category-attribut';


interface ProductUpdateProps{
    params:{
        productId: string
    }
}

export default async function ProductUpdate({params}: ProductUpdateProps) {

    const queryClient = new QueryClient()

    await queryClient.prefetchQuery({
        queryKey: ['categories'],
        queryFn: ()=> getCategorySneakers(),
    })
    await queryClient.prefetchQuery({
        queryKey: ['themes'],
        queryFn: ()=> getThemes(),
    })
    await queryClient.prefetchQuery({
        queryKey: ['tags'],
        queryFn: ()=> getTagSneakers(),
    })

    // Get product by ID and populate form with data
    
    const product = await getProductById(params.productId);
    if (!product) {
        return (
            <p className='text-center text-2xl'>Page not found</p>
        )
    }

    return (
        <main className=''>
            <Typographie component={"h1"} variant='h1' size="lg" className='p-4'>Updated category</Typographie>
            <main className='w-full'>
                <HydrationBoundary state={dehydrate(queryClient)}>
                    <FormProduct productId={params.productId} product={product} />
                </HydrationBoundary>
            </main>
        </main>
    )
}