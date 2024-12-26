"use client";

import { Button } from "../ui/button";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { isLikeCustom, likedCustom } from "@/actions/custom/like";

import { AiFillHeart } from "react-icons/ai"; 
import { AiOutlineHeart } from "react-icons/ai";
import { cn } from "@/lib/utils";

interface BtnLikeProps{
    sneakerId?: string;
    isFloat?: boolean;
    className?: string;
    onChange?: Dispatch<SetStateAction<number>>;
}

export const BtnLike = ({sneakerId, isFloat=true, onChange, className}: BtnLikeProps) => {

  const [like, setLike] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const res = await isLikeCustom(sneakerId);
      setLike(res);     
    })()
  }, [sneakerId, onChange])

  const onLike = () => {
    likedCustom(sneakerId).then((res) => {
      setLike(res);
      if(onChange) onChange((state)=> res ? state + 1 : state - 1);
    });
  };
  
  return (
      <Button
        variant={"outline"}
        size={"icon"}
        className={cn("border-none shadow-none bg-black/10 backdrop-blur-md text-white", isFloat && "absolute top-1 right-2 z-20", className)}
        type="button"
        onClick={onLike}
      >
        {!like ? (
          <AiOutlineHeart className="!h-8 !w-8" />
        ) : (
          <AiFillHeart className="!h-8 !w-8 text-red-500" />
        )}
      </Button>
  );
};
