"use server"

import { Typographie } from '@/components/typographie'
import { FormTheme } from '@/app/admin/themes/form-theme'
import { getThemeById } from '@/actions/category-attribut';


interface ThemeUpdateProps{
    params:{
        themeId: string
    }
}

export default async function ThemeUpdate({params}: ThemeUpdateProps) {

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
                <FormTheme themeId={params.themeId} theme={theme} />
        </main>
        </main>
    )
}