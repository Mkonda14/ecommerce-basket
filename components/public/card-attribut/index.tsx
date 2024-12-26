"use client";

import style from "./style.module.css";
import { Typographie } from "@/components/typographie";
import { cn, milleToK } from "@/lib/utils";
import { CldImgDynamic } from "@/components/cld-img-dynamic";
import Link from "next/link";


import { BtnLike } from "./btn-like";
import { useState } from "react";
import { BiHeart, BiUser } from "react-icons/bi";

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
    <article className={cn(style.card, "relative")}>
      <div
        className={cn(
          "w-12 h-12 absolute z-50 bottom-[80px] right-0 px-1.5 py-1.5 border bg-emerald-500",
          style.shadowBtn
        )}
      >
        <BtnLike entity={entity} themeId={id} onChange={setLikes} className="rounded-full bg-white" />
      </div>

      <Link href={`#`}>
        <figure className={cn("relative", style.figure)}>
          <CldImgDynamic 
            publicId={image?.publicId || ""}
            size="card-attribut"
            alt={name}
          />  
        </figure>

        <footer>
        <Typographie component='h3' variant='h3' size='lg'>{name}</Typographie>
          <div className="flex items-center justify-end gap-x-4">
            <div className="flex items-center gap-x-2"> <BiUser /> <span>{milleToK(popularity)}</span> </div>
            <div className="flex items-center gap-x-2"> <BiHeart /> <span>{milleToK(likes)}</span> </div>
          </div>
          <Typographie component='p' variant='p' size='md'>{category?.secondName}/{category?.name}</Typographie>
        </footer>
      </Link>
    </article>
  );
};
