import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { CldImage } from "next-cloudinary";
import { useState } from "react";

const sizes = {
    "cell-table": "w-10 h-8 rounded-full",
    "crsl-min": "h-16 w-16",
    "card-basket": "h-20 w-20",
    "card-basket-max": "h-40 w-36",
    "card-theme": "h-40 w-full",
    "card-sneaker-form": "h-[220px] w-full",
    "card-sneaker": "h-[300px] w-full",
    "crsl-max": "h-[400px] w-full",
};

const roundeds = {
    "sm": "rounded-sm",
    "md": "rounded-md",
    "none": "rounded-none",
}

const sizeInitials = {
    "cell-table": {height: 32, width: 40},
    "crsl-min": {height: 150, width: 150},
    "card-basket": {height: 150, width: 150},
    "card-basket-max": {height: 200, width: 150},
    "card-theme": {height: 250, width: 400},
    "card-sneaker-form": {height: 250, width: 175},
    "card-sneaker": {height: 250, width: 175},
    "crsl-max": {height: 250, width: 250},
}

interface ICldImgDynamic {
    publicId: string;
    isActive?: boolean;
    size: keyof typeof sizes;
    className?: string;
    rounded?: keyof typeof roundeds; 
    alt?: string;
}

export const CldImgDynamic = ({
    publicId,
    isActive,
    size,
    className,
    rounded= "md",
    alt = "image card",
}: ICldImgDynamic) => {
    const [isLoading, setIsLoading] = useState(true);
    const initial = sizeInitials[size];
    return (
        <div className={cn(`relative`, sizes[size], isActive ? "opacity-50" : "")}>
            {isLoading && (
                <Skeleton className={cn("absolute top-0 left-0 w-full h-full z-10", roundeds[rounded])} />
            )}
            <CldImage
                alt={alt}
                width={initial.width}
                height={initial.height}
                src={publicId}
                sizes="10vw"
                onLoad={() => setIsLoading(false)}
                className={cn("w-full h-full object-cover", roundeds[rounded], className)}
            />
        </div>
    );
};
