
import { CldImage } from "next-cloudinary"

interface CellImgProps{
    public_id: string;
}

export const CellImg = ({public_id}:CellImgProps) => {
  return (
    <div className="w-10 h-8 rounded-full bg-slate-300">
        <CldImage
            width={40}
            height={32}
            alt="Image product"
            src={public_id}
            className="w-10 h-8 rounded-sm object-cover"
        />
    </div>
  )
}
