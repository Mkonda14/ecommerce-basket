"use client"

import { AiOutlineHeart } from "react-icons/ai"
import { Button } from "../ui/button"

export const BtnLike = () => {
  return (
    <Button variant={"outline"} size={"icon"} className="border-none shadow-none absolute top-1 right-2 z-20">
        <AiOutlineHeart className="h-8 w-8 p-0" />
    </Button>
  )
}
