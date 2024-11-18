

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

interface IDialogChangeSize{
    size: number;
    sneakerId: string;
    publicId: string;
    sizes: number[];
}
  
  export const DialogChangeSize = ({size, publicId, sizes, sneakerId}: IDialogChangeSize) => {
        return (
            <Dialog>
                <DialogTrigger> <Button variant={"link"}>{size}</Button> </DialogTrigger>
                <DialogContent>
                        <section className="flex gap-x-4">
                            <div className="">
                                <CldImgDynamic size="crsl-max" publicId={publicId} />
                            </div>
                            <div className="">
                                <DialogHeader>
                                    <DialogDescription>
                                        Chaussure pour enfant
                                    </DialogDescription>
                                    <DialogTitle>Nike Dunk Low</DialogTitle>
                                    <DialogDescription>
                                        69,99 €
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="">
                                    <Typographie component="h3" variant="h3" size="lg">Sélectionner la taille</Typographie>
                                    <div className="grid grid-cols-5">
                                        {sizes.map(size =>(
                                            <Button key={size} variant="link" onClick={() => console.log('change size', size, sneakerId)}>
                                                {size}
                                            </Button>
                                        ))}
                                    </div>
                                    <Button>Met à jour la taille</Button>
                                </div>
                            </div>
                        </section>
                </DialogContent>
            </Dialog>
        )
  }
  