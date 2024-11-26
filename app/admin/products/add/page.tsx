"use server"

import { Typographie } from '@/components/typographie'
import { FormProduct } from '../form-product'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { AiOutlineUnorderedList } from 'react-icons/ai'


export default async function ProductAdd() {

  return (
    <main className=''>
      <header className="flex justify-between items-center p-4">
          <Typographie component={"h1"} variant='h1' size="lg">New sneakers</Typographie>
          <Button asChild>
              <Link href="/admin/products">
                  <AiOutlineUnorderedList />
                  <span>Sneakers</span>
              </Link>
          </Button>
      </header>
      <main className='w-full'>
            <FormProduct />
      </main>
    </main>
  )
}