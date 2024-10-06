import { FormLabel } from "@/components/ui/form"
import { IconType } from "react-icons/lib";

import { BsInfoCircleFill } from "react-icons/bs"; 
import { BsFillQuestionCircleFill } from "react-icons/bs"; 
import { BsFillExclamationCircleFill } from "react-icons/bs"; 
import { cn } from "@/lib/utils";

interface LabelProps{
    type?: "question" | "info" | "exclamation";
    className?: string;
    children: React.ReactNode;
}

export const Label = ({type, children, className}: LabelProps) => {

    let Icon : IconType | undefined;

    switch (type) {
        case 'question':
            Icon = BsFillQuestionCircleFill;
            break;
        case 'info':
            Icon = BsInfoCircleFill;
            break;
        case 'exclamation':
            Icon = BsFillExclamationCircleFill;
            break;
    }
    return (
        <FormLabel className={cn("flex items-center gap-x-2 text-base", className)}> 
            <span> {children} </span> {Icon && <Icon />}
        </FormLabel>
    )
}
