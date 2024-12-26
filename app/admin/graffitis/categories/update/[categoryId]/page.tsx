"use server"

import { Typographie } from '@/components/typographie'
import { FormCategory } from '@/app/admin/category-graffitis/form-category'
import { getCategoryGraffitiById } from '@/actions/graffiti/category';


interface CategoryUpdateProps{
    params:{
        categoryId: string
    }
}

export default async function CategoryUpdate({params}: CategoryUpdateProps) {

    // Get category by ID and populate form with data
    
    const category = await getCategoryGraffitiById(params.categoryId);
    if (!category) {
        return (
            <p className='text-center text-2xl'>Page not found</p>
        )
    }

    return (
        <main className=''>
        <Typographie component={"h1"} variant='h1' size="lg" className='p-4'>Updated category graffiti</Typographie>
            <main className='w-full'>
                    <FormCategory categoryId={params.categoryId} category={category} />
            </main>
        </main>
    )
}