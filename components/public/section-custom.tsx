import { AiOutlineWarning } from "react-icons/ai"; 
import { FcIdea } from "react-icons/fc"; 

import Image from "next/image"

import Link from "next/link"
import { Typographie } from "../typographie"
import { Button } from "../ui/button"


export const SectionCustom = () => {
  return (
    <section className="my-8">
        <section className="container flex justify-center items-center bg-gray-100">
            <div className="w-1/2 p-6">
                <Typographie component="h3" variant="h3" size="xl" className="mb-4">À notre imagination</Typographie>
                <div className="p-4 bg-[#FAFAFA] shadow-md rounded-md">
                    <Typographie component="blockquote" variant="blockquote" size="md">Au tarif habituel</Typographie>
                    <Typographie component="h4" variant="h4" size="lg" className="mb-4">Designer votre <span className="text-emerald-500">sneaker</span> selon vous</Typographie>
                    
                    <Typographie component="p" variant="p" size="md">
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Exercitationem recusandae dolorem est, beatae sunt in voluptatum 
                        sit eaque obcaecati magnam quas itaque! Doloremque, tempore dolorum praesentium neque sed fuga? Magni.
                    </Typographie>

                    <Typographie component="p" variant="p" size="md" className="flex items-center gap-x-2 text-muted-foreground mt-4">
                        <AiOutlineWarning className="size-5 text-orange-400" />
                        <span>Veuillez crée un compte pour pouvoir utiliser cette service</span>
                    </Typographie>

                    <Button variant={"default"} className="my-4" asChild>
                        <Link href="/custom-info">
                            <FcIdea /> <span>savoir plus</span>
                        </Link>
                    </Button>
                </div>
            </div>
            <div className="w-1/2">
                <Image
                    src={"/assets/pngs/img-graffiti-1.png"}
                    alt={"sneaker-white"}
                    height={400}
                    width={500}
                    className="h-1/2 object-contain"
                />
            </div>
        </section>
    </section>
  )
}
