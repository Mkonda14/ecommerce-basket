"use client";

import { Button } from "../ui/button";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { isLikeSneaker, likedSneaker } from "@/actions/product/like";

import { AiFillHeart } from "react-icons/ai"; 
import { AiOutlineHeart } from "react-icons/ai";
import { cn } from "@/lib/utils";

interface BtnLikeProps{
    sneakerId?: string;
    isFloat?: boolean;
    onChange?: Dispatch<SetStateAction<number>>;
}

export const BtnLike = ({sneakerId, isFloat=true, onChange}: BtnLikeProps) => {

  const [like, setLike] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const res = await isLikeSneaker(sneakerId);
      setLike(res);     
    })()
  }, [sneakerId, onChange])

  const onLike = () => {
    likedSneaker(sneakerId).then((res) => {
      setLike(res);
      if(onChange) onChange((state)=> res ? state + 1 : state - 1);
    });
  };
  
  return (
      <Button
        variant={"outline"}
        size={"icon"}
        className={cn("border-none shadow-none", isFloat && "absolute top-1 right-2 z-20" )}
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
