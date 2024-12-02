
import { TitleLink } from "@/components/public/title-link"
import { Accordion } from "@/components/ui/accordion"
import { AccordeonCategorySneaker } from "./accordeon-category-sneaker"
import { AccordeonCategoryTheme } from "./accordeon-category-theme"
import { AccordeonSize } from "./accordeon-size"
import { AccordeonColor } from "./accordeon-color"
import { AccordeonPrice } from "./accordeon-price"
import { AccordeonTag } from "./accordeon-tag"


export const Filter = () => {

    return (
        <section className="w-1/4 sticky">
            <TitleLink>Filter</TitleLink>
            <section>
                <Accordion type="single" collapsible className="w-full">
                    <AccordeonCategorySneaker />
                    <AccordeonCategoryTheme />
                    <AccordeonColor />
                    <AccordeonPrice />
                    <AccordeonSize />
                    <AccordeonTag />
                </Accordion>
            </section>
        </section>
    )
}
