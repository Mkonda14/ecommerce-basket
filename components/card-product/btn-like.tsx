"use client";

import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { isLikeSneaker, likedSneaker } from "@/actions/product/like";

import { AiFillHeart } from "react-icons/ai"; 
import { AiOutlineHeart } from "react-icons/ai";

interface BtnLikeProps{
    sneakerId?: string;
}

export const BtnLike = ({sneakerId}: BtnLikeProps) => {

  const [like, setLike] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const res = await isLikeSneaker(sneakerId);
      setLike(res);     
    })()
  }, [sneakerId])

  const onLike = () => {
    likedSneaker(sneakerId).then((res) => {
      setLike(res);
    });
  };
  
  return (
      <Button
        variant={"outline"}
        size={"icon"}
        className="border-none shadow-none absolute top-1 right-2 z-20"
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
