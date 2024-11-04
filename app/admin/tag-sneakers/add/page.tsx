"use server"

import { Typographie } from '@/components/typographie'
import { FormTag } from '@/app/admin/tag-sneakers/form-tag'

export default async function TagAdd() {

  return (
    <main className=''>
      <Typographie component={"h1"} variant='h1' size="lg" className='p-4'>New tag sneaker</Typographie>
      <main className='w-full'>
            <FormTag />
      </main>
    </main>
  )
}