import { cn } from "@/lib/utils";

interface CellBoolProps{
    isTrue?: boolean;
}
export const CellBool = ({isTrue}:CellBoolProps) => {

    const color: string = isTrue ? "bg-emerald-300" : "bg-red-300"

    return (
        <div className={cn("w-4 h-4 rounded-full", color)}></div>
    )
}
