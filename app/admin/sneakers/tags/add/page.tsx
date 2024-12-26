"use server"

import { Typographie } from '@/components/typographie'
import { FormTag } from '@/app/admin/tag-sneakers/form-tag'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { AiOutlineUnorderedList } from 'react-icons/ai'

export default async function TagAdd() {

  return (
    <main className=''>
      <header className="flex justify-between items-center p-4">
          <Typographie component={"h1"} variant='h1' size="lg">New tag sneaker</Typographie>
          <Button asChild>
              <Link href="/admin/tag-sneakers">
                  <AiOutlineUnorderedList />
                  <span>Tags</span>
              </Link>
          </Button>
      </header>
      <main className='w-full'>
            <FormTag />
      </main>
    </main>
  )
}