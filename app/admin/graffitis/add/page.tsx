"use server"

import { Typographie } from '@/components/typographie'
import { FormGraffiti } from '@/app/admin/graffitis/form-graffiti'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { AiOutlineUnorderedList } from 'react-icons/ai'
import { getCategoryGraffitis } from '@/actions/graffiti/category'
import { QueryClient, HydrationBoundary, dehydrate } from '@tanstack/react-query'

export default async function GraffitiAdd() {

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['categorie-graffitis'],
    queryFn: ()=> getCategoryGraffitis(),
  });

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
        <HydrationBoundary state={dehydrate(queryClient)}>
            <FormGraffiti />
        </HydrationBoundary>
      </main>
    </main>
  )
}