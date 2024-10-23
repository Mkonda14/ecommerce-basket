"use server"

import { Typographie } from '@/components/typographie'
import { FormProduct } from '../form-product'


export default async function ProductAdd() {

  return (
    <main className=''>
      <Typographie component={"h1"} variant='h1' size="lg" className='p-4'>New product</Typographie>
      <main className='w-full'>
            <FormProduct />
      </main>
    </main>
  )
}