import { useState } from "react";
import { CldImage } from "next-cloudinary";
import { Skeleton } from "../ui/skeleton";
import { cn } from "@/lib/utils";

interface CardImgProps{
    className?: string;
    public_id: string;
    alt?: string;
    isPreview?: boolean;
}

export const CardImg = ({className, public_id, alt="Description du produit", isPreview}:CardImgProps) => {

    const [isLoading, setIsLoading] = useState(true);

    return (
        <div className={`relative ${isPreview ? "h-[220px]": "h-[300px]"}`}>
            {isLoading &&
                <Skeleton className="absolute top-0 left-0 w-full h-full z-10" />
            }
            <CldImage
                alt={alt} 
                width={150}
                height={200}
                src={public_id}
                sizes="10vw"
                onLoad={() => setIsLoading(false)}
                className={cn("w-full h-full object-cover", className)} 
            />
        </div>
    )
}
