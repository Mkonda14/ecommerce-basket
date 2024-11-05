

import { BsSortNumericDownAlt } from "react-icons/bs"; 
import { AiOutlineSortAscending } from "react-icons/ai"; 
import { Button } from "@/components/ui/button"

export const Sorts = () => {
    return (
        <section className="w-full flex justify-end items-center gap-x-4">
            <Button className="flex gap-x-4">
                <span>Alphabet</span>
                <AiOutlineSortAscending />
            </Button>
            <Button className="flex gap-x-4">
                <span>Price</span>
                <BsSortNumericDownAlt />
            </Button>
        </section>
    )
}
