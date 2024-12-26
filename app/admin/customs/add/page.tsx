"use server"

import { Typographie } from '@/components/typographie'
import { FormCustom } from '../form-custom'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { AiOutlineUnorderedList } from 'react-icons/ai'

import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { getThemes } from '@/actions/theme'
import { getSneakerSelectForm } from '@/actions/product/select'
import { getCategoryCustoms } from '@/actions/custom/category'


export default async function ProductAdd() {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['themes-form'],
    queryFn: ()=> getThemes(),
  })

  await queryClient.prefetchQuery({
    queryKey: ['sneakers-form'],
    queryFn: ()=> getSneakerSelectForm(),
  })

  await queryClient.prefetchQuery({
    queryKey: ['categories-form'],
    queryFn: ()=> getCategoryCustoms(),
  })

  return (
    <main className=''>
      <header className="flex justify-between items-center p-4">
          <Typographie component={"h1"} variant='h1' size="lg">New custom</Typographie>
          <Button asChild>
              <Link href="/admin/customs">
                  <AiOutlineUnorderedList />
                  <span>Customs</span>
              </Link>
          </Button>
      </header>
      <main className='w-full'>
      <HydrationBoundary state={dehydrate(queryClient)}>
          <FormCustom />
      </HydrationBoundary>
      </main>
    </main>
  )
}