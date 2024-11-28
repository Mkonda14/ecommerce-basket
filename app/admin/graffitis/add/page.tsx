"use server"

import { Typographie } from '@/components/typographie'
import { FormGraffiti } from '@/app/admin/graffitis/form-graffiti'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { AiOutlineUnorderedList } from 'react-icons/ai'

export default async function GraffitiAdd() {

  return (
    <main className=''>
      <header className="flex justify-between items-center p-4">
          <Typographie component={"h1"} variant='h1' size="lg">New graffiti</Typographie>
          <Button asChild>
              <Link href="/admin/graffitis">
                  <AiOutlineUnorderedList />
                  <span>Graffitis</span>
              </Link>
          </Button>
      </header>
      <main className='w-full'>
            <FormGraffiti />
      </main>
    </main>
  )
}