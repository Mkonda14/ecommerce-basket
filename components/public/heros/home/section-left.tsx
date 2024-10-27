import { BiRightArrowAlt } from "react-icons/bi"; 
import { CadreText } from "@/components/cadre-text"
import { Typographie } from "@/components/typographie"
import { Button } from "@/components/ui/button"
import { StatistiqueTheme } from "./statisique-theme";



export const SectionLeft = () => {
  return (
    <section className="w-1/2">
        <Typographie component="blockquote" variant="blockquote" size="md" className="">
            Les sneakers pas comme les autres
        </Typographie>
        <Typographie component="h1" variant="h1" size="2xl" className="">
            Exprimez-Vous avec Nos <span className="text-emerald-500">Sneakers</span> Customisées
        </Typographie>
        <CadreText component="h2" variant="h2" size="xl" className="mb-5">2025</CadreText>

        <Typographie component="p" variant="p" size="md" className="mb-5">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vitae asperiores non autem facere! Delectus qui eius quasi provident quaerat placeat, molestias accusamus impedit. Libero corporis tempore possimus in, officiis veritatis!
        </Typographie>

        <Button className="flex gap-x-2 capitalize text-xl p-6">
          <span>thèmes new</span> 
          <BiRightArrowAlt className="w-8 h-8" /> 
        </Button>

        <StatistiqueTheme />
    </section>
  )
}
