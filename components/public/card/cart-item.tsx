import { CldImgDynamic } from "@/components/cld-img-dynamic"
import { Typographie } from "@/components/typographie";
import { DialogChangeSize } from "./dialog-change-size";


interface ICartItem{
    model: string;
    id: string;
    marque: string;
    price: number;
    promoPrice: number;
    isPromo: boolean;
    size: number;
    quantity: number;
    images: {
        publicId: string;
    }[];
}

export const CartItem = ({model, id, marque, promoPrice, isPromo, size, quantity, images, price}: ICartItem) => {
    return (
        <article className="flex gap-x-4">
            <figure>
                <CldImgDynamic size="card-basket-max" publicId={images[0].publicId} />
            </figure>
            <div className="">
                <div className="flex">
                    <Typographie component="h3" variant="h3" size="lg">{marque} / {model}</Typographie>
                    <Typographie component="h4" variant="h4" size="md"  className="space-x-3">
                    {(isPromo && promoPrice) && <span>{promoPrice * quantity}</span>}
                        <span className={isPromo ? "line-through text-slate-400" : ""}>{price * quantity}</span>
                    </Typographie>
                </div>
                <Typographie component="h3" variant="h3" size="lg">{'categorie'}</Typographie>
                <Typographie component="h3" variant="h3" size="lg">{'les tags'}</Typographie>
                <Typographie component="h3" variant="h3" size="lg">
                    <span>Taille/ Pointure</span> 
                    <DialogChangeSize size={size} sneakerId={id} sizes={[]} publicId={images[0].publicId} /> 
                </Typographie>
            </div>
        </article>
    )
}
