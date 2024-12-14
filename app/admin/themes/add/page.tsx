"use server"

import { Typographie } from '@/components/typographie'
import { FormTheme } from '@/app/admin/themes/form-theme'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { AiOutlineUnorderedList } from 'react-icons/ai'
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query'
import { getCategoryThemes } from '@/actions/category-attribut'

export default async function ThemeAdd() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['categorie-themes'],
    queryFn: ()=> getCategoryThemes(),
  });

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
        <HydrationBoundary state={dehydrate(queryClient)}>
            <FormTheme />
        </HydrationBoundary>
      </main>
    </main>
  )
}