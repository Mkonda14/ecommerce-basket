import { BsArrowRight } from "react-icons/bs"; 
import { Typographie } from "@/components/typographie"
import Image from "next/image"


export const SectionGrid = () => {
    return (
        <section>
            <header className="text-center mb-10">
                <Typographie component="h2" variant="h2" size="xl">Its not magic. </Typographie>
                <Typographie component="h2" variant="h2" size="xl">
                    Its <span className="text-slate-500">Bolt</span>. 
                </Typographie>
                <Typographie component="p" variant="p" size="md">
                    Its Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque ipsa magni quia alias aut! 
                </Typographie>
            </header>
            <section className="grid grid-cols-3 gap-4">
                <article className="col-span-2 border rounded-md p-4 relative flex flex-col justify-between h-80 shadow">
                    <header><Typographie component="h4" variant="h4" size="md">Conversion</Typographie></header>
                    <div className="">
                        <Image
                            alt="image-graffiti (1)"
                            src="/assets/pngs/graffiti-3.png"
                            className="absolute top-8 right-4 w-auto h-3/4 object-contain -z-10"
                            height={250}
                            width={280}
                        />
                    </div>
                    <footer className="w-1/2">
                        <Typographie component="h2" variant="h2" size="xl">Get shoppers to the finish line.</Typographie>
                        <Typographie component="p" variant="p" size="md" className="text-muted-foreground">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Pariatur, dolorem!</Typographie>
                        <Typographie component="p" variant="p" size="md" className="flex items-center gap-x-4 font-semibold">
                            <span>Lorem, ipsum dolor sit</span>
                            <BsArrowRight />
                        </Typographie>
                    </footer>
                </article>
                <article className="col-span-1 border rounded-md p-4 relative flex flex-col justify-between h-80 shadow">
                    <header><Typographie component="h4" variant="h4" size="md">Conversion</Typographie></header>
                    <div className="">
                        <Image
                            alt="image-graffiti (1)"
                            src="/assets/pngs/img-art-1.png"
                            className="absolute top-8 right-4 w-auto h-3/4 object-contain -z-10"
                            height={250}
                            width={280}
                        />
                    </div>
                    <footer>
                        <Typographie component="h2" variant="h2" size="xl">Get shoppers to the finish line.</Typographie>
                        <Typographie component="p" variant="p" size="md" className="flex items-center gap-x-4 font-semibold">
                            <span>Lorem, ipsum dolor</span>
                            <BsArrowRight />
                        </Typographie>
                    </footer>
                </article>
                <article className="col-span-1 border rounded-md p-4 relative flex flex-col justify-between h-80 shadow">
                    <header><Typographie component="h4" variant="h4" size="md">Conversion</Typographie></header>
                    <div className="">
                        <Image
                            alt="image-graffiti (1)"
                            src="/assets/pngs/img-graffiti-1.png"
                            className="absolute top-8 right-4 w-auto h-3/4 object-contain -z-10"
                            height={250}
                            width={280}
                        />
                    </div>
                    <footer>
                        <Typographie component="h2" variant="h2" size="xl">Get shoppers to the finish line.</Typographie>
                        <Typographie component="p" variant="p" size="md" className="flex items-center gap-x-4 font-semibold">
                            <span>Lorem, ipsum dolor</span>
                            <BsArrowRight />
                        </Typographie>
                    </footer>
                </article>
                <article className="col-span-2 border rounded-md p-4 relative flex flex-col justify-between h-80 shadow">
                    <header><Typographie component="h4" variant="h4" size="md">Conversion</Typographie></header>
                    <div className="">
                        <Image
                            alt="image-graffiti (1)"
                            src="/assets/pngs/graffiti-1.png"
                            className="absolute top-8 right-4 w-auto h-3/4 object-contain -z-10"
                            height={250}
                            width={280}
                        />
                    </div>
                    <footer className="w-1/2">
                        <Typographie component="h2" variant="h2" size="xl">Get shoppers to the finish line.</Typographie>
                        <Typographie component="p" variant="p" size="md" className="text-muted-foreground">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Pariatur, dolorem!</Typographie>
                        <Typographie component="p" variant="p" size="md" className="flex items-center gap-x-4 font-semibold">
                            <span>Pariatur, dolorem</span>
                            <BsArrowRight />
                        </Typographie>
                    </footer>
                </article>
            </section>
        </section>
    )
}
