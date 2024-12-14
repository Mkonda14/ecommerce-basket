"use server"

import { Typographie } from '@/components/typographie'
import { FormTheme } from '@/app/admin/themes/form-theme'
import { getCategoryThemes, getThemeById } from '@/actions/category-attribut';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';


interface ThemeUpdateProps{
    params:{
        themeId: string
    }
}

export default async function ThemeUpdate({params}: ThemeUpdateProps) {

    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ['categorie-themes'],
        queryFn: ()=> getCategoryThemes(),
    });

    // Get theme by ID and populate form with data
    
    const theme = await getThemeById(params.themeId);
    if (!theme) {
        return (
            <p className='text-center text-2xl'>Page not found</p>
        )
    }

    return (
        <main className=''>
            <Typographie component={"h1"} variant='h1' size="lg" className='p-4'>Updated theme</Typographie>
            <main className='w-full'>
                <HydrationBoundary state={dehydrate(queryClient)}>
                    <FormTheme themeId={params.themeId} theme={theme} />
                </HydrationBoundary>
            </main>
        </main>
    )
}