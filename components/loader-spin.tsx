import { cn } from "@/lib/utils";
import { AiOutlineLoading } from "react-icons/ai"; 

const sizes = {
  md: "size-4",
  lg: "size-6",
  xl: "size-8"
}

interface Props{
    className?: string;
    size?: keyof typeof sizes;
}

export const LoaderSpin = ({className, size="md"}: Props) => {
  return (
    <AiOutlineLoading className={cn("animate-spin h-4 w-4", sizes[size], className)} />
  )
}
