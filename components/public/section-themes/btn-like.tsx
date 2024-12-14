"use client";

import { Button } from "@/components/ui/button";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { isLikeTheme, likedTheme } from "@/actions/category-attribut/like-theme";

import { AiFillHeart } from "react-icons/ai"; 
import { AiOutlineHeart } from "react-icons/ai";
import { likedGraffiti } from "@/actions/graffiti/like-graffiti";

interface BtnLikeProps{
    themeId?: string;
    onChange: Dispatch<SetStateAction<number>>;
    entity: "theme" | "graffiti"
}

export const BtnLike = ({themeId, entity, onChange}: BtnLikeProps) => {

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
        className="border-none shadow-none absolute top-0 right-0 z-20 bg-black/10 backdrop-blur-md text-white"
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
