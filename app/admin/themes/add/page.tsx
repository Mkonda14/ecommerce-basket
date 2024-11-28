"use server"

import { Typographie } from '@/components/typographie'
import { FormTheme } from '@/app/admin/themes/form-theme'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { AiOutlineUnorderedList } from 'react-icons/ai'

export default async function ThemeAdd() {

  return (
    <main className=''>
      <header className="flex justify-between items-center p-4">
          <Typographie component={"h1"} variant='h1' size="lg">New thème</Typographie>
          <Button asChild>
              <Link href="/admin/themes">
                  <AiOutlineUnorderedList />
                  <span>Thèmes</span>
              </Link>
          </Button>
      </header>
      <main className='w-full'>
            <FormTheme />
      </main>
    </main>
  )
}