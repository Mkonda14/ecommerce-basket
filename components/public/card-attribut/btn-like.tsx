"use client";

import { Button } from "@/components/ui/button";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { isLikeTheme, likedTheme } from "@/actions/theme/like";

import { AiFillHeart } from "react-icons/ai"; 
import { AiOutlineHeart } from "react-icons/ai";
import { likedGraffiti } from "@/actions/graffiti/like-graffiti";
import { cn } from "@/lib/utils";

interface BtnLikeProps{
    themeId?: string;
    onChange: Dispatch<SetStateAction<number>>;
    entity: "theme" | "graffiti",
    className?: string;
}

export const BtnLike = ({themeId, entity, onChange, className}: BtnLikeProps) => {

  const [like, setLike] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const res = await isLikeTheme(themeId);
      setLike(res);     
    })()
  }, [themeId])

  const onLike = () => {
    let handleLike = null;
    switch (entity) {
      case "theme":
        handleLike = likedTheme;
        break;   
      case "graffiti":
        handleLike = likedGraffiti;
        break;
    }
    
    handleLike(themeId).then((res) => {
      setLike(res);
      if(res){
        onChange((likes: number)=> likes + 1)
      }else{
        onChange((likes: number)=> likes - 1)
      }
    });
  };
  
  return (
      <Button
        variant={"outline"}
        size={"icon"}
        className={cn("border-none shadow-none bg-black/10 backdrop-blur-md text-slate-800", className)}
        type="button"
        onClick={onLike}
      > 
        {!like ? (
          <AiOutlineHeart className="!h-6 !w-6" />
        ) : (
          <AiFillHeart className="!h-6 !w-6 text-red-500" />
        )}
      </Button>
  );
};