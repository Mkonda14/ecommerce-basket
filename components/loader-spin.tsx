import { cn } from "@/lib/utils";
import { AiOutlineLoading } from "react-icons/ai"; 

interface Props{
    className?: string;
}

export const LoaderSpin = ({className}: Props) => {
  return (
    <AiOutlineLoading className={cn("animate-spin h-4 w-4", className)} />
  )
}
