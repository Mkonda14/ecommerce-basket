import { cn } from "@/lib/utils";

const variants = {
    h1: "font-extrabold tracking-wide",
    h2: "font-semibold tracking-wide",
    h3: "font-semibold tracking-normal",
    h4: "font-medium tracking-normal",
    p:  "tracking-tight",
    blockquote: "mt-6 border-l-2 pl-6 italic"
}

const sizes = {
    sm: "text-sm font-light leading-tight",
    md: "text-base font-normal leading-normal",
    lg: "text-xl font-semibold leading-relaxed",
    xl: "text-3xl font-extrabold leading-loose",
}

const colors ={
    black: "text-slate-800",
    white: "text-white",
}

interface TypoProps{
    variant?: keyof typeof variants;
    size?: keyof typeof sizes;
    color?: keyof typeof colors;
    component: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "blockquote";
    className?: string;
    children: React.ReactNode;
}

export const Typographie = ({variant = "h3", component: Component, size = "md", color="black", className, children}: TypoProps) => {
  return (
    <Component className={cn(variants[variant], sizes[size], colors[color], className)}>
        {children}
    </Component>
  )
}
