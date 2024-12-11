import { Typographie } from "@/components/typographie"
import Image from "next/image"
import { cn } from "@/lib/utils";

import style from "./style.module.css"
import { Btn } from "./btn";


export const SectionGrid = () => {
    return (
        <section className={cn("mb-10")}>
            <header className="text-center mb-10">
                <Typographie component="h2" variant="h2" size="xl">Its not magic. </Typographie>
                <Typographie component="h2" variant="h2" size="xl">
                    Its <span className="text-slate-500">Bolt</span>. 
                </Typographie>
                <Typographie component="p" variant="p" size="md">
                    Its Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque ipsa magni quia alias aut! 
                </Typographie>
            </header>
            <section className="grid grid-cols-3 gap-4 rounded-lg">
                <article className={cn("col-span-2 border rounded-md p-4 relative flex flex-col justify-between h-80 bg-white", style.wallTexture)}>
                    <header className="flex justify-start">
                        <Btn className={cn(style.fontAdventureScript, "text-xl tracking-wider")}>The rock stars</Btn>
                    </header>
                    <div className="">
                        <Image
                            alt="image-graffiti (1)"
                            src="/assets/pngs/graffiti-3.png"
                            className="absolute top-8 right-4 w-auto h-3/4 object-contain"
                            height={250}
                            width={280}
                        />
                    </div>
                    <footer className="w-1/2">
                        <h2 className={cn(style.fontGhoustOutline, "text-3xl")}>Get shoppers to the finish line.</h2>
                        <p className={cn(style.fontAdventureScript, "text-2xl tracking-wider text-muted-foreground")}>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Pariatur, dolorem!</p>                    </footer>
                </article>
                <article className={cn("col-span-1 border rounded-md p-4 relative flex flex-col justify-between h-80 bg-white", style.wallTexture)}>
                    <header className="flex justify-start">
                        <Btn className={cn(style.fontAdventureScript, "text-xl tracking-wider")}>Magic sneaker</Btn>
                    </header>
           
                    <footer>
                        <h2 className={cn(style.fontGhoustOutline, "text-3xl")}>Get shoppers to the finish line.</h2>
                        <p className={cn(style.fontAdventureScript, "text-2xl tracking-wider text-muted-foreground")}>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Pariatur, dolorem!</p>                    </footer>
                </article>
                <article className={cn("col-span-1 border rounded-md p-4 relative flex flex-col justify-between h-80 bg-white", style.wallTexture)}>
                    <header className="flex justify-start">
                        <Btn className={cn(style.fontAdventureScript, "text-xl tracking-wider")}>New collections</Btn>
                    </header>
                   
                    <footer>
                        <h2 className={cn(style.fontGhoustOutline, "text-3xl")}>Get shoppers to the finish line.</h2>
                        <p className={cn(style.fontAdventureScript, "text-2xl tracking-wider text-muted-foreground")}>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Pariatur, dolorem!</p>                    </footer>
                </article>
                <article className={cn("col-span-2 border rounded-md p-4 relative flex flex-col justify-between h-80 bg-white", style.wallTexture)}>
                    <header className="flex justify-start">
                        <Btn className={cn(style.fontAdventureScript, "text-xl tracking-wider")}>King of the graffitis</Btn>
                    </header>
                    <div className="">
                        <Image
                            alt="image-graffiti (1)"
                            src="/assets/pngs/graffiti-1.png"
                            className="absolute top-8 right-4 w-auto h-3/4 object-contain"
                            height={250}
                            width={280}
                        />
                    </div>
                    <footer className="w-1/2">
                        <h2 className={cn(style.fontGhoustOutline, "text-3xl")}>Get shoppers to the finish line.</h2>
                        <p className={cn(style.fontAdventureScript, "text-2xl tracking-wider text-muted-foreground")}>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Pariatur, dolorem!</p>
                    </footer>
                </article>
            </section>
        </section>
    )
}
