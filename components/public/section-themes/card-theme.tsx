
import { Typographie } from '@/components/typographie';
import Image from 'next/image';

interface CardThemeProps{
    publicId: string;
    name: string;
    description: string;
    popularity: number;
}

export const CardTheme = ({publicId, name, description, popularity}: CardThemeProps) => {
  return (
    <article className='bg-[#FAFAFA]'>
        <figure>
            <Image
                src={publicId}
                alt={name}
                height={250}
                width={400}
                className=''
            />
        </figure>
        <Typographie component='h3' variant='h3' size='lg'>{name}</Typographie>
        <Typographie component='p' variant='p' size='md'>{description}</Typographie>
        <Typographie component='blockquote' variant='blockquote' size='md'>Popularity: <span className='font-bold'>{popularity}</span></Typographie>
    </article>
  )
}
