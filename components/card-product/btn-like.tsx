"use client"

import { AiOutlineHeart } from "react-icons/ai"
import { Button } from "../ui/button"

export const BtnLike = () => {
  return (
    <Button variant={"outline"} size={"icon"} className="p-0 border-none shadow-none">
        <AiOutlineHeart className="h-6 w-6" />
    </Button>
  )
}
