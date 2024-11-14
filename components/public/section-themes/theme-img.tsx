
import { useState } from "react";
import { CldImage } from "next-cloudinary";
import { Skeleton } from "../../ui/skeleton";
import { cn } from "@/lib/utils";

interface CardImgProps{
    className?: string;
    public_id: string;
    alt?: string;
}

export const ThemeImg = ({className, public_id, alt="Description du produit"}:CardImgProps) => {

    const [isLoading, setIsLoading] = useState(true);

    return (
        <div className={`relative h-40`}>
            {isLoading &&
                <Skeleton className="absolute top-0 left-0 w-full h-full z-10 rounded-md" />
            }
            <CldImage
                alt={alt} 
                height={250}
                width={400}
                src={public_id}
                sizes="10vw"
                onLoad={() => setIsLoading(false)}
                className={cn("w-full h-full object-cover rounded-md", className)} 
            />
        </div>
    )
}
