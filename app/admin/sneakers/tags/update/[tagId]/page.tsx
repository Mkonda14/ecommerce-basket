"use server"

import { Typographie } from '@/components/typographie'
import { FormTag } from '@/app/admin/tag-sneakers/form-tag'
import { getTagSneakerById } from '@/actions/category-attribut';


interface TagUpdateProps{
    params:{
        tagId: string
    }
}

export default async function TagUpdate({params}: TagUpdateProps) {

    // Get category by ID and populate form with data
    
    const tag = await getTagSneakerById(params.tagId);
    if (!tag) {
        return (
            <p className='text-center text-2xl'>Page not found</p>
        )
    }

    return (
        <main className=''>
        <Typographie component={"h1"} variant='h1' size="lg" className='p-4'>Updated tag sneaker</Typographie>
        <main className='w-full'>
                <FormTag tagId={params.tagId} tag={tag} />
        </main>
        </main>
    )
}