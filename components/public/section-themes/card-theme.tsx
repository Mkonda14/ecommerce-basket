import { AiOutlineHeart } from "react-icons/ai"; 
import { BiUser } from "react-icons/bi"; 
import { BiHeart } from "react-icons/bi"; 

import { Typographie } from '@/components/typographie';
import { Button } from "@/components/ui/button";
import { milleToK } from "@/lib/utils";
import Link from "next/link";

import { Theme } from "@prisma/client";
import { ThemeImg } from "./theme-img";

export type CardThemeProps = Theme & {
    image: {publicId: string} | null;
    category: {name: string, globalName: string};
    like?: number;
}


export const CardTheme = ({image, category, name, popularity, like=1000}: CardThemeProps) => {
  return (
    <article className='w-[350px] bg-[#FAFAFA] relative'>
        <Button variant="ghost" size={"icon"} className="absolute top-0 right-0 text-white"> 
          <AiOutlineHeart className="w-6 h-6" /> 
        </Button>
        <Link href="#">
          <figure className="">
              <ThemeImg
                public_id={image?.publicId || ""}
                alt={name}
              />
          </figure>
          <Typographie component='h3' variant='h3' size='lg'>{name}</Typographie>
          <div className="flex items-center justify-end gap-x-4">
            <div className="flex items-center gap-x-2"> <BiUser /> <span>{milleToK(popularity)}</span> </div>
            <div className="flex items-center gap-x-2"> <BiHeart /> <span>{milleToK(like)}</span> </div>
          </div>
          <Typographie component='p' variant='p' size='md'>{category.globalName}/{category.name}</Typographie>
        </Link>
    </article>
  )
}
