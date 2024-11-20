

import { CldImgDynamic } from "@/components/cld-img-dynamic";
import { Typographie } from "@/components/typographie";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { RadioSize } from "../../shop/show-product/radio-size";
import { useState } from "react";
import { useLocalStorage } from "@/hooks/use-localstorage";

interface IDialogChangeSize{
    size: number;
    sneakerId: string;
    model: string;
    marque: string;
    price: number;
    isPromo?: boolean;
    promoPrice?: number;
    publicId: string;
    sizes: {size: number}[];
}
  
  export const DialogChangeSize = ({size, publicId, sizes, marque, model, price, isPromo, promoPrice, sneakerId}: IDialogChangeSize) => {

        const [value, setValue] = useState<number>(size)
        const [vSize, setVSize] = useState<number>(size)
        const {updatedSize} = useLocalStorage("customers_sneaker_baskets");

        const onUpdatedSize = ()=> {
            const res = updatedSize(sneakerId, size, value);
            if(res) setVSize(value);  
        }

        return (
            <Dialog>
                <DialogTrigger> <Button variant={"link"} className="text-xl underline underline-offset-2">{vSize}</Button> </DialogTrigger>
                <DialogContent className="!max-w-[800px] bg-white">
                        <section className="flex gap-x-4">
                            <div className="">
                                <CldImgDynamic size="crsl-max" publicId={publicId} />
                            </div>
                            <div className="">
                                <DialogHeader>
                                    <DialogDescription>
                                        {model}
                                    </DialogDescription>
                                    <DialogTitle>{marque}</DialogTitle>
                                    <DialogDescription>
                                        <Typographie component="h4" variant="h4" size="md"  className="space-x-3 text-xl">
                                            {(isPromo && promoPrice) && <span>{promoPrice}$</span>}
                                            <span className={isPromo ? "line-through text-slate-400" : ""}>{price}$</span>
                                        </Typographie>
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="flex flex-col gap-4 mt-8">
                                    <Typographie component="h3" variant="h3" size="md">Sélectionner la taille</Typographie>
                                    <div className="w-full grid grid-cols-4 gap-24">
                                        {sizes.map(({size}) =>(
                                            <RadioSize key={size} value={value} size={size} onChange={setValue} />
                                        ))}
                                    </div>
                                    <Button size={"lg"} className="mt-4" onClick={onUpdatedSize}>Met à jour la taille</Button>
                                </div>
                            </div>
                        </section>
                </DialogContent>
            </Dialog>
        )
  }
  