"use server"

import { Typographie } from '@/components/typographie'
import { FormGraffiti } from '../../form-graffiti';
import { getGraffitiById } from '@/actions/graffiti';


interface ThemeUpdateProps{
    params:{
        graffitiId: string
    }
}

export default async function GraffitiUpdate({params}: ThemeUpdateProps) {

    // Get theme by ID and populate form with data
    
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
                    <FormGraffiti graffitiId={params.graffitiId} graffiti={graffiti} />
            </main>
        </main>
    )
}