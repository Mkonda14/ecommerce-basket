
import { TitleLink } from "@/components/public/title-link"
import { Accordion } from "@/components/ui/accordion"
import { AccordeonCategory } from "./accordeon-category"


export const Filter = () => {
    
    return (
        <section className="w-1/4 sticky">
            <TitleLink>Filter</TitleLink>
            <section>
                <Accordion type="single" collapsible className="w-full">
                    <AccordeonCategory />
                </Accordion>
            </section>
        </section>
    )
}
