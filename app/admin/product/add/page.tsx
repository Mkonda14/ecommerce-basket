"use client"

import { Typographie } from '@/components/typographie'
import { FormProduct } from '../form-product'
import { useForm } from 'react-hook-form';
import { ProductSchema } from '@/models/product';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

export default function ProductAdd() {

  const form = useForm<z.infer<typeof ProductSchema>>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      marque: "",
      model: "",
      themes: [],
      colors: {
        primary: {
          name: "primary",
          code: "#000"
        },
        secondary: [{
          name: "secondary",
          code: "#000"
        }]
      },
      sizes: [],
      tags:[],
      images:[{
        public_id: "product/mhpcchmackb8wjphvth2",
        secure_url: "https://res.cloudinary.com/dlqnx8srw/image/upload/v1728696317/product/mhpcchmackb8wjphvth2.jpg"
      }]
    },
  });

  return (
    <main className=''>
      <Typographie component={"h1"} variant='h1' size="lg" className='p-4'>New product</Typographie>
      <main className='w-full'>
            <FormProduct form={form} />
      </main>
    </main>
  )
}