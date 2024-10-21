"use server"

import { Typographie } from '@/components/typographie'
import { FormProduct } from '@/app/admin/products/form-product'
import { getProductById } from '@/actions/product';


interface ProductUpdateProps{
    params:{
        productId: string
    }
}

export default async function ProductUpdate({params}: ProductUpdateProps) {

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
                <FormProduct productId={params.productId} product={product} />
        </main>
        </main>
    )
}