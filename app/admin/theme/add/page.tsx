"use client"

import { Typographie } from '@/components/typographie'
import { FormTheme } from '@/app/admin/theme/form-theme'

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { ThemeSchema } from '@/models/category-attributs';

export default function ThemeAdd() {

  const form = useForm<z.infer<typeof ThemeSchema>>({
    resolver: zodResolver(ThemeSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  return (
    <main className=''>
      <Typographie component={"h1"} variant='h1' size="lg" className='p-4'>New theme</Typographie>
      <main className='w-full'>
            <FormTheme form={form} />
      </main>
    </main>
  )
}