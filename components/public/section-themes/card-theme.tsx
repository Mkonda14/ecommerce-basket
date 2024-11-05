import { BiUser } from "react-icons/bi"; 
import { BiHeart } from "react-icons/bi"; 

import { Typographie } from '@/components/typographie';
import { milleToK } from "@/lib/utils";
import Link from "next/link";

import { Theme } from "@prisma/client";
import { ThemeImg } from "./theme-img";
import { BtnLike } from "./btn-like";
import { useState } from "react";

export type CardThemeProps = Theme & {
    image: {publicId: string} | null;
    category: {name: string, globalName: string};
    like?: number;
    _count: {likes: number};
}


export const CardTheme = ({id, image, category, name, popularity, _count}: CardThemeProps) => {
  const [likes, setLikes] = useState<number>(_count.likes);
  return (
    <article className='w-full bg-[#FAFAFA] relative'>
        <BtnLike themeId={id} onChange={setLikes} />
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
            <div className="flex items-center gap-x-2"> <BiHeart /> <span>{milleToK(likes)}</span> </div>
          </div>
          <Typographie component='p' variant='p' size='md'>{category.globalName}/{category.name}</Typographie>
        </Link>
    </article>
  )
}
