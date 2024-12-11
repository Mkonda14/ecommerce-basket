import { cn } from "@/lib/utils";
import { BsArrowRight } from "react-icons/bs"; 

interface IBtn{
    children: React.ReactNode;
    className?: string;
}
export const Btn = ({children, className}: IBtn) => {
    return (
        <div className={cn("flex items-center gap-x-2 py-0 px-4 border bg-white/10 backdrop-blur-md rounded-3xl")}>
            <BsArrowRight />
            <span className={cn(className, "pt-1")}>{children}</span>
        </div>
    )
}
