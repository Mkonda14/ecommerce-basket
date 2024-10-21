"use server"

import { Typographie } from '@/components/typographie'
import { FormTag } from '@/app/admin/tags/form-tag'

export default function TagAdd() {

  return (
    <main className=''>
      <Typographie component={"h1"} variant='h1' size="lg" className='p-4'>New tag</Typographie>
      <main className='w-full'>
            <FormTag />
      </main>
    </main>
  )
}