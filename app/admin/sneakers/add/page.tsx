"use server"

import { Typographie } from '@/components/typographie'
import { FormSneaker } from '../form-sneaker'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { AiOutlineUnorderedList } from 'react-icons/ai'

import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { getCategorySneakers } from '@/actions/product/category'
import { getTagSneakers} from '@/actions/product/tag'


export default async function ProductAdd() {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['categories'],
    queryFn: ()=> getCategorySneakers(),
  })
  await queryClient.prefetchQuery({
    queryKey: ['tags'],
    queryFn: ()=> getTagSneakers(),
  })

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
      <HydrationBoundary state={dehydrate(queryClient)}>
            <FormSneaker />
      </HydrationBoundary>
      </main>
    </main>
  )
}