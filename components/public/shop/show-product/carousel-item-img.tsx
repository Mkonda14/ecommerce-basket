import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { CldImage } from "next-cloudinary";
import { useState } from "react";

const sizes = {
    sm: "h-16 w-16",
    lg: "h-[400px] w-full",
}

interface CarouselItemImgProps{
    id: string;
    publicId: string;
    isActive?: boolean;
    size: keyof typeof sizes;
    className?: string;
}

export const CarouselItemImg = ({id, publicId, isActive, size, className}: CarouselItemImgProps) => {
    const [isLoading, setIsLoading] = useState(true);

    return (
        <div className={cn(`relative`, sizes[size], isActive ? "opacity-50" : "")}>
            {isLoading &&
                <Skeleton className="absolute top-0 left-0 w-full h-full z-10" />
            }
            <CldImage
                alt={`sneaker-${id}`} 
                width={150}
                height={200}
                src={publicId}
                sizes="10vw"
                onLoad={() => setIsLoading(false)}
                className={cn("w-full h-full object-cover rounded-md", className)} 
            />
        </div>
    )
}
