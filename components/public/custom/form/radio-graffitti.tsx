"use client";

import { BiCheckDouble } from "react-icons/bi"; 
import { AiOutlineHeart, AiOutlineUser } from "react-icons/ai";
import { getGraffitiCards } from "@/actions/public-actions/custom";
import { CldImgDynamic } from "@/components/cld-img-dynamic";
import { InnerHTML } from "@/components/InnerHTML";
import { Typographie } from "@/components/typographie";
import { cn } from "@/lib/utils";
import { Dispatch, SetStateAction, useState } from "react";
import { BtnLike } from "../../card-attribut/btn-like";

interface IRadioGraffiti {
  name?: string;
  onChange: Dispatch<SetStateAction<string>>;
  value?: string;
  data: Awaited<ReturnType<typeof getGraffitiCards>> extends Array<infer T>
    ? T
    : never;
}

export const RadioGraffitti = ({
  value,
  onChange,
  name = "graffitti",
  data,
}: IRadioGraffiti) => {
  const [liked, setLiked] = useState<number>(data._count.likes);
  const isChecked = value === data.id;
  return (
    <article
      className={cn(
        "relative group",
        "hover:ring-[1px] ring-offset-2 border rounded-sm shadow-sm",
        isChecked && "ring-[2px] ring-emerald-500"
      )}
    >
      {isChecked && (
          <span className="absolute -top-4 -right-4 z-50 h-8 w-8 rounded-full transition-all duration-300 flex items-center justify-center bg-emerald-500 text-white">
            <BiCheckDouble className="size-6" />
          </span>
      )}
    

      <CldImgDynamic
        size="radio-graffitti"
        publicId={data.image?.publicId || ""}
        className={cn(
          "transition-all duration-300"
        )}
      />

      <div
        className={cn(
          "absolute inset-0 p-2 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-white/50 group-hover:backdrop-blur-md",
          "flex flex-col justify-between overflow-hidden"
        )}
      >
        <div className="flex flex-col items-center gap-y-2 absolute z-20 top-1 right-4 bg-red-70">
          <BtnLike
            attrId={data.id}
            entity="graffiti"
            className="h-[45px] w-[45px] rounded-sm border"
            onChange={setLiked}
          />
          <label
            htmlFor={`${data.id}`}
            className="cursor-pointer"
          >
            <input
              id={`${data.id}`}
              className="hidden"
              type="radio"
              value={data.id}
              name={name}
              checked={isChecked}
              onChange={(checked) => {
                return checked.target.checked && onChange(data.id);
              }}
            />
            {/* svg */}
            <svg
              className={cn(
                "rounded-sm p-[11px] transition-all duration-300 shadow-md border",
                {
                  "stroke-emerald-500": isChecked,
                  "stroke-gray-400": !isChecked,
                }
              )}
              style={{
                strokeLinecap: "round",
                strokeDasharray: 45,
                strokeDashoffset: isChecked ? 0 : 45,
                backgroundColor: isChecked ? "#E0FFEB" : "#FAFAFA",
                fill: isChecked ? "#E0FFEB" : "none",
                strokeWidth: ".2rem",
              }}
              height="45"
              width="45"
            >
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </label>
        </div>

        <div className="flex flex-col justify-between">
          <div className="">
            <Typographie component="h3" variant="h3" size="md">{data.name}</Typographie>
            <Typographie component="p" variant="p" size="sm">{data.category?.name}</Typographie>
            <Typographie component="h3" variant="h3" size="md" className="mt-2">
              {data.price} $
            </Typographie>
            <div className="flex items-center gap-x-4 mt-4">
              <Typographie
                component="p"
                variant="p"
                size="sm"
                className="flex items-center space-x-1"
              >
                <AiOutlineHeart className="text-red-500" /><span>{liked}</span>
              </Typographie>
              <Typographie
                component="p"
                variant="p"
                size="sm"
                className="flex items-center space-x-1"
              >
                <AiOutlineUser />
                <span>{data.popularity}</span>
              </Typographie>
            </div>
          </div>
          <InnerHTML length={50} text={data.description} className="mt-4" />
        </div>
      </div>

    </article>
  );
};
