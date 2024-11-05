

import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button";

interface ItemAccordeonProps{
    idx: number | string;
    label: string;
    children: React.ReactNode
}

export const ItemAccordeon = ({idx, label, children}: ItemAccordeonProps) => {
    return (
        <AccordionItem value={`item-${idx}`}>
            <Button variant={"outline"} className="w-full justify-between shadow-none border-none text-lg px-0 py-4 text-slate-600" asChild>
                <AccordionTrigger>
                    <span>{label}</span>
                </AccordionTrigger>
            </Button>
            <AccordionContent className="py-4 space-y-2">
                {children}
            </AccordionContent>
        </AccordionItem>
    )
}
