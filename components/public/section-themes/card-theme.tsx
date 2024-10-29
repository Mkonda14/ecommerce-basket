import { AiOutlineHeart } from "react-icons/ai"; 
import { BiUser } from "react-icons/bi"; 
import { BiHeart } from "react-icons/bi"; 

import { Typographie } from '@/components/typographie';
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { milleToK } from "@/lib/utils";
import Link from "next/link";

export interface CardThemeProps{
    publicId: string;
    theme: string;
    category: string;
    popularity: number;
    like: number;
}

export const CardTheme = ({publicId, theme, category, popularity, like}: CardThemeProps) => {
  return (
    <article className='bg-[#FAFAFA] relative'>
        <Button variant="ghost" size={"icon"} className="absolute top-0 right-0 text-white"> 
          <AiOutlineHeart className="w-6 h-6" /> 
        </Button>
        <Link href="#">
          <figure className="">
              <Image
                  src={publicId}
                  alt={theme}
                  height={250}
                  width={400}
                  className='w-full h-40 object-cover rounded-lg'
              />
          </figure>
          <Typographie component='h3' variant='h3' size='lg'>{theme}</Typographie>
          <div className="flex items-center justify-end gap-x-4">
            <div className="flex items-center gap-x-2"> <BiUser /> <span>{milleToK(popularity)}</span> </div>
            <div className="flex items-center gap-x-2"> <BiHeart /> <span>{milleToK(like)}</span> </div>
          </div>
          <Typographie component='p' variant='p' size='md'>{category}</Typographie>
        </Link>
    </article>
  )
}
