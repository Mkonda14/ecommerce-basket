import { AiFillStar } from "react-icons/ai"; 
import { cn } from "@/lib/utils";

interface IBtn {
  children: React.ReactNode;
  className?: string;
  isColor?: boolean;
}
export const Btn = ({ children, className, isColor }: IBtn) => {
  return (
    <div
      className={cn(
        "flex items-center gap-x-2 px-3 py-1 border backdrop-blur-md rounded-3xl text-sm text-white absolute top-3 right-3",
        isColor ? "bg-black/80" : "bg-white/10"
      )}
    >
        <AiFillStar className="size-5 text-yellow-500" />
        <span className={cn(className, "")}>{children}</span>
    </div>
  );
};
