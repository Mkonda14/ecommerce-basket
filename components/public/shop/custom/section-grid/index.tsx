import { Typographie } from "@/components/typographie"
import Image from "next/image"
import { cn } from "@/lib/utils";
import { Btn } from "./btn";


export const SectionGrid = () => {
    return (
        <section className={cn("mb-20 mt-5 flex justify-between items-center gap-x-20")}>
            <section className="w-5/12 flex flex-col justify-center gap-y-10">
                <Typographie component="h2" variant="h2" size="xl">It is difficult for designer is assets how best</Typographie>
                <div className="flex flex-col gap-y-4">
                    <Typographie component="h4" variant="h4" size="lg">Best graffitis</Typographie>
                    <Typographie component="p" variant="p" size="md" className="text-justify">Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo unde exercitationem consequatur.</Typographie>
                </div>
                <div className="flex flex-col gap-y-4">
                    <Typographie component="h4" variant="h4" size="lg">Best graffitis</Typographie>
                    <Typographie component="p" variant="p" size="md" className="text-justify">Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo unde exercitationem consequatur.</Typographie>
                </div>
            </section>
            <section className="w-1/2 flex justify-end gap-x-4">
                <section className="h-[70vh] flex flex-col gap-y-4">
                    <div className="h-1/2 w-[256px] flex justify-center items-center relative border">
                        <Btn>Martin</Btn>
                        <Image
                            src="/assets/imgs/illustration/graffiti-violet.jpg"
                            alt="graffiti violet"
                            height={250}
                            width={250}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="h-1/3 w-[256px] flex justify-center items-center relative border-t-2">
                        <Btn isColor>Martin</Btn>
                        <Image
                            src="/assets/pngs/graffiti-mk.png"
                            alt="graffiti-mk"
                            height={250}
                            width={250}
                            className="w-4/5 h-auto object-contain"
                        />
                    </div>
                </section>
                <section className="h-[70vh] flex flex-col justify-end gap-y-4">
                    <div className="h-1/3 w-[256px] flex justify-center items-center relative border-b-2">
                        <Btn isColor>The king</Btn>
                        <Image
                            src="/assets/pngs/graffiti-1.png"
                            alt="graffiti-1"
                            height={250}
                            width={250}
                            className="h-full w-4/5 object-contain"
                        />
                    </div>
                    <div className="h-1/2 w-[256px] flex justify-center items-center relative">
                        <Btn>Rock</Btn>
                        <Image
                            src="/assets/imgs/illustration/bombe-marron.jpg"
                            alt="bombe colore"
                            height={250}
                            width={250}
                            className="h-full w-full object-cover"
                        />
                    </div>
                </section>
            </section>
        </section>
    )
}
