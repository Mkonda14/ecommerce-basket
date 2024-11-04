
import Image from "next/image"

import { RiCompassDiscoverFill } from "react-icons/ri"; 
import Link from "next/link"
import { Typographie } from "../typographie"
import { Button } from "../ui/button"


export const SectionCustom = () => {
  return (
    <section className="my-8">
        <section className="container flex justify-center items-center bg-slate-200">
            <div className="w-1/2 p-6">
                <Typographie component="h3" variant="h3" size="xl" className="mb-4">À notre imagination</Typographie>
                <div className="p-4 bg-[#FAFAFA] shadow-md rounded-md">
                    <Typographie component="h4" variant="h4" size="lg">Designer notre sneaker selon vous</Typographie>
                    <Typographie component="h4" variant="h4" size="md" className="font-bold mb-4">Au tarif habituel</Typographie>
                    
                    <Typographie component="p" variant="p" size="md">
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Exercitationem recusandae dolorem est, beatae sunt in voluptatum 
                        sit eaque obcaecati magnam quas itaque! Doloremque, tempore dolorum praesentium neque sed fuga? Magni.
                    </Typographie>

                    <Button variant={"outline"} className="my-4" asChild>
                        <Link href="#">
                            <RiCompassDiscoverFill /> <span>savoir plus</span>
                        </Link>
                    </Button>
                </div>
            </div>
            <div className="w-1/2">
                <Image
                    src={"/assets/pngs/sneaker-white.png"}
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
