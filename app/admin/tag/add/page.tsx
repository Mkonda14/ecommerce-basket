"use client"

import { Typographie } from '@/components/typographie'
import { FormTag } from '@/app/admin/tag/form-tag'

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { TagSchema } from '@/models/category-attributs';

export default function TagAdd() {

  const form = useForm<z.infer<typeof TagSchema>>({
    resolver: zodResolver(TagSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  return (
    <main className=''>
      <Typographie component={"h1"} variant='h1' size="lg" className='p-4'>New tag</Typographie>
      <main className='w-full'>
            <FormTag form={form} />
      </main>
    </main>
  )
}