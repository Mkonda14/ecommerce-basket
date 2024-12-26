import { Button } from "../ui/button";

interface PriceProps{
    price: number;
    reducprice?: number;
    isPromo?: boolean;
}

export const Price = ({price, reducprice, isPromo}: PriceProps) => {
   
    return (
        <Button className="absolute top-1/2 -translate-y-1/2 -right-4 space-x-1 text-lg p-6">
            <span className="font-light">$</span>
            {isPromo && reducprice ? (
                <>
                    <span className="font-bold pr-4">{reducprice}</span>
                    <span className="text-xs absolute top-1.5 right-2 line-through">{price}</span>
                </>
            ) : (
                <span className="font-bold">{price || "23,433"}</span>
            )}
        </Button>
    )
}
