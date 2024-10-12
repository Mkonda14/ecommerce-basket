import { useState } from "react";
import { CldImage } from "next-cloudinary";
import { Skeleton } from "../ui/skeleton";
import { cn } from "@/lib/utils";

interface CardImgProps{
    className?: string;
    public_id: string;
    alt?: string;
}

export const CardImg = ({className, public_id, alt="Description du produit"}:CardImgProps) => {

    const [isLoading, setIsLoading] = useState(true);

    return (
        <div>
            {!isLoading ? 
                <Skeleton className="w-full h-[220px]" /> :
                <CldImage
                    alt={alt} 
                    width={150}
                    height={200}
                    src={public_id}
                    sizes="10vw"
                    onLoad={() => setIsLoading(false)}
                    className={cn("w-full h-[220px] object-cover", className)} 
                />
            }
        </div>
    )
}
