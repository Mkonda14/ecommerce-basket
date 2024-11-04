"use server"

import { Typographie } from '@/components/typographie'
import { FormCategory } from '@/app/admin/category-themes/form-category'

export default async function CategoryAdd() {

  return (
    <main className=''>
      <Typographie component={"h1"} variant='h1' size="lg" className='p-4'>New category thème</Typographie>
      <main className='w-full'>
            <FormCategory />
      </main>
    </main>
  )
}