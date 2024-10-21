"use client"

import { Typographie } from '@/components/typographie'
import { FormCategory } from '@/app/admin/category/form-category'
import { useForm } from 'react-hook-form';

import { CategorySchema } from '@/models/category-attributs';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTransition } from 'react';
import { saveCategory } from '@/actions/category-attribut/save';
import { ToastSave } from '@/hooks/use-toast-save';

export default function CategoryAdd() {

  const form = useForm<z.infer<typeof CategorySchema>>({
    resolver: zodResolver(CategorySchema),
    defaultValues: {
      name: "",
      description: "",
      designer: "",
    },
  });

  const [isLoading, startTransition] = useTransition();

  const onSubmit = (data: z.infer<typeof CategorySchema>) => {
    startTransition(async () => {
      const res = await saveCategory(data);
      if (res.type === "success") form.reset();
      ToastSave(res)
    });
  };

  return (
    <main className=''>
      <Typographie component={"h1"} variant='h1' size="lg" className='p-4'>New category</Typographie>
      <main className='w-full'>
            <FormCategory form={form} onSubmit={onSubmit} isLoading={isLoading} />
      </main>
    </main>
  )
}