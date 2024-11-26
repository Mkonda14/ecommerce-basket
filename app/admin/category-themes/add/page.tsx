"use server"

import { Typographie } from '@/components/typographie'
import { FormCategory } from '@/app/admin/category-themes/form-category'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { AiOutlineUnorderedList } from 'react-icons/ai'

export default async function CategoryAdd() {

  return (
    <main className=''>
      <header className="flex justify-between items-center p-4">
          <Typographie component={"h1"} variant='h1' size="lg">New category thème</Typographie>
          <Button asChild>
              <Link href="/admin/category-themes">
                  <AiOutlineUnorderedList />
                  <span>Catégories</span>
              </Link>
          </Button>
      </header>
      <main className='w-full'>
            <FormCategory />
      </main>
    </main>
  )
}