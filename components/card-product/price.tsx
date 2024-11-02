import { Button } from "../ui/button";

interface PriceProps{
    price: number;
    promoPrice?: number;
    isPromo?: boolean;
}

export const Price = ({price, promoPrice, isPromo}: PriceProps) => {
   
    return (
        <Button className="absolute top-1/2 -translate-y-1/2 -right-8 space-x-2 text-lg p-6">
            <span className="font-light">$</span>
            {isPromo && promoPrice ? (
                <>
                    <span className="font-bold pr-4">{promoPrice}</span>
                    <span className="text-xs absolute top-2 right-4 line-through">{price}</span>
                </>
            ) : (
                <span className="font-bold">{price || "23,433"}</span>
            )}
        </Button>
    )
}
