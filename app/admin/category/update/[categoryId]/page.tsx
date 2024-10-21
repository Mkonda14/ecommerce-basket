"use client"

import { Typographie } from '@/components/typographie'
import { FormCategory } from '@/app/admin/category/form-category'
import { useForm } from 'react-hook-form';

import { CategorySchema } from '@/models/category-attributs';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useEffect, useTransition } from 'react';
import { ToastSave } from '@/hooks/use-toast-save';
import { updateCategory } from '@/actions/category-attribut/update';
import { getCategoryById } from '@/actions/category-attribut';


interface CategoryUpdateProps{
    params:{
        categoryId: string
    }
}

export default function CategoryUpdate({params}: CategoryUpdateProps) {

    // Get category by ID and populate form with data
    const form = useForm<z.infer<typeof CategorySchema>>({
        resolver: zodResolver(CategorySchema),
        defaultValues: {
        name: "",
        description: "",
        designer: "",
        },
    });

    useEffect(() =>{
        (async function(){
            const category = await getCategoryById(params.categoryId);
            form.reset({
                name: category?.name,
                description: category?.description,
                designer: category?.designer,
            });
        })()
    }, [params.categoryId, form])

    const [isLoading, startTransition] = useTransition();

    const onSubmit = (data: z.infer<typeof CategorySchema>) => {
        startTransition(async () => {
        const res = await updateCategory(params.categoryId, data);
        if (res.type === "success") form.reset();
        ToastSave(res)
        });
    };

    return (
        <main className=''>
        <Typographie component={"h1"} variant='h1' size="lg" className='p-4'>Updated category</Typographie>
        <main className='w-full'>
                <FormCategory form={form} onSubmit={onSubmit} isLoading={isLoading} />
        </main>
        </main>
    )
}