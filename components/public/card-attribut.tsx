import { BiUser } from "react-icons/bi"; 
import { BiHeart } from "react-icons/bi"; 

import { Typographie } from '@/components/typographie';
import { milleToK } from "@/lib/utils";
import Link from "next/link";

import { BtnLike } from "./section-themes/btn-like";
import { useState } from "react";
import { CldImgDynamic } from "../cld-img-dynamic";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface CardAttributProps {
    id: string;
    image: {publicId: string} | null;
    category: {name: string, secondName: string | null} | null;
    name: string;
    popularity: number;
    _count: {likes: number};
}

type TAttribute = CardAttributProps & {
  entity: "theme" | "graffiti";
}



export const CardAttribut = ({id, image, category, name, popularity, _count, entity}: TAttribute) => {
  const [likes, setLikes] = useState<number>(_count.likes);
  return (
    <article className='w-full bg-[#FAFAFA] relative'>
        <BtnLike entity={entity} themeId={id} onChange={setLikes} />
        <Link href="#">
          <figure className="">
              <CldImgDynamic
                publicId={image?.publicId || ""}
                size="card-attribut"
                alt={name}
              />
          </figure>
          <Typographie component='h3' variant='h3' size='lg'>{name}</Typographie>
          <div className="flex items-center justify-end gap-x-4">
            <div className="flex items-center gap-x-2"> <BiUser /> <span>{milleToK(popularity)}</span> </div>
            <div className="flex items-center gap-x-2"> <BiHeart /> <span>{milleToK(likes)}</span> </div>
          </div>
          <Typographie component='p' variant='p' size='md'>{category?.secondName}/{category?.name}</Typographie>
        </Link>
    </article>
  )
}
