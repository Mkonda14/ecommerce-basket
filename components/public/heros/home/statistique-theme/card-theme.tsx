import { IoMdAdd } from "react-icons/io"; 
import { Typographie } from "@/components/typographie"

interface CardProps{
    label: string;
    nbre: number;
}

export const CardTheme = ({label, nbre}: CardProps) => {
    return (
        <div className="">
            <Typographie component="h3" variant="h3" size="lg" className="flex items-center">
                <span className="text-3xl">{nbre}</span> <IoMdAdd />
            </Typographie>
            <Typographie component="p" variant="p" size="md" className="capitalize">{label}</Typographie>
        </div>
    )
}
