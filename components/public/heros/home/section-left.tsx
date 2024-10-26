import { BiRightArrowAlt } from "react-icons/bi"; 
import { CadreText } from "@/components/cadre-text"
import { Typographie } from "@/components/typographie"
import { Button } from "@/components/ui/button"



export const SectionLeft = () => {
  return (
    <section className="w-1/2">
        <Typographie component="blockquote" variant="blockquote" size="sm" className="">
            Les thèmes pas comme les autres
        </Typographie>
        <Typographie component="h1" variant="h1" size="2xl" className="capitalize">
            summer thèmes collections
        </Typographie>
        <CadreText component="h2" variant="h2" size="xl" className="mb-5">2025 - 2026</CadreText>

        <Typographie component="p" variant="p" size="md" className="mb-5">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit aspernatur vitae, possimus sapiente maiores mollitia neque.
        </Typographie>

        <Button className="flex gap-x-4 capitalize text-xl p-6">
          <span>thèmes collections</span> 
          <BiRightArrowAlt className="w-5 h-5" /> 
        </Button>
    </section>
  )
}
