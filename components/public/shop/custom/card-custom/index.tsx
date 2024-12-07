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
    <article className={style.card}>
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
          <div
            className={cn(
              "w-12 h-12 absolute z-[1000] bottom-0 right-0 flex justify-center items-center bg-emerald-500",
              style.shadowBtn
            )}
          >
            <BtnLike sneakerId={id} isFloat={true} className="rounded-full bg-white z-[10000]" />
          </div>
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
