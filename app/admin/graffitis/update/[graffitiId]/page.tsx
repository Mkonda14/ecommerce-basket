"use server"

import { Typographie } from '@/components/typographie'
import { FormGraffiti } from '../../form-graffiti';
import { getGraffitiById } from '@/actions/graffiti';
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';
import { getCategoryGraffitis } from '@/actions/graffiti/category';


interface ThemeUpdateProps{
    params:{
        graffitiId: string
    }
}

export default async function GraffitiUpdate({params}: ThemeUpdateProps) {

    // Get theme by ID and populate form with data
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ['categorie-graffitis'],
        queryFn: ()=> getCategoryGraffitis(),
    });
    
    const graffiti = await getGraffitiById(params.graffitiId);
    if (!graffiti) {
        return (
            <p className='text-center text-2xl'>Page not found</p>
        )
    }

    return (
        <main className=''>
            <Typographie component={"h1"} variant='h1' size="lg" className='p-4'>Updated graffiti</Typographie>
            <main className='w-full'>
                <HydrationBoundary state={dehydrate(queryClient)}>
                    <FormGraffiti graffitiId={params.graffitiId} graffiti={graffiti} />
                </HydrationBoundary>
            </main>
        </main>
    )
}