"use client";

import { LogoSneaker } from "@/components/logo-sneaker";
import style from "./style.module.css";
import { Typographie } from "@/components/typographie";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { CldImgDynamic } from "@/components/cld-img-dynamic";
import Link from "next/link";
import { BtnLike } from "@/components/card-product/btn-like";
import { InnerHTML } from "@/components/InnerHTML";

interface ICardCustom {
  id?: string;
  slug: string;
  marque: string;
  model: string;
  description: string;
  price: number;
  images: { publicId: string }[];
  isPromo?: boolean;
  promoPrice?: number;
  tags?: { name: string }[];
}

export const CardCustom = ({
  marque,
  model,
  price,
  isPromo,
  promoPrice,
  tags,
  images,
  slug,
  id,
  description
}: ICardCustom) => {
  return (
    <article className={cn(style.card, "relative")}>

      <div
        className={cn(
          "w-12 h-12 absolute z-50 bottom-[134px] right-0 px-1.5 py-2 border bg-white",
          style.shadowBtn
        )}
      >
        <BtnLike sneakerId={id} isFloat={false} className="rounded-full bg-white" />
      </div>

      <Link href={`/shop/custom/${slug}`}>
        <header className="flex justify-between items-center">
          <LogoSneaker marque={marque} />
          <Typographie
            component="h4"
            variant="h4"
            size="md"
            className="space-x-3 text-xl"
          >
            {isPromo && promoPrice ? (
              <>
                <span>{promoPrice}$</span>
                <span className={"line-through text-slate-400"}>
                  {price}$
                </span>
              </>
            ) : (
              <span className={""}>
                {price}$
              </span>
            )}
          </Typographie>
        </header>

        <figure className={cn("relative", style.figure)}>
          <CldImgDynamic publicId={images[0]?.publicId} size="card-sneaker" />  
        </figure>

        <footer>
          <Typographie component="h4" variant="h4" size="md" className="capitalize mb-2">{marque} {model}</Typographie>

          <InnerHTML text={description} length={100} />

          <div className="flex gap-x-2 mt-2">
            {tags?.map((tag, idx) => (
              <Badge className="capitalize" key={idx}>{tag.name}</Badge>
            ))}
          </div>
        </footer>
      </Link>
    </article>
  );
};
