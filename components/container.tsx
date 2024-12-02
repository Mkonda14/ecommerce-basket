import { cn } from "@/lib/utils";

interface IContainer{
    component?: "div" | "section" | "header" | "footer" | "nav" | "main";
    maxWidth?: boolean;
    className?: string;
    children: React.ReactNode;
}
export const Container = ({component: Component = "section", maxWidth, className, children}: IContainer) => {
  return (
    <Component className={cn('w-full container', maxWidth ? "max-w-7xl" : "", className)}>
        {children}
    </Component>
  )
}
