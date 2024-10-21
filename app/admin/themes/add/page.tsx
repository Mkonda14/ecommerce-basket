"use server"

import { Typographie } from '@/components/typographie'
import { FormTheme } from '@/app/admin/themes/form-theme'

export default function ThemeAdd() {

  return (
    <main className=''>
      <Typographie component={"h1"} variant='h1' size="lg" className='p-4'>New theme</Typographie>
      <main className='w-full'>
            <FormTheme />
      </main>
    </main>
  )
}