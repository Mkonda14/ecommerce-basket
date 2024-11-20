import { cn } from "@/lib/utils";

const variants = {
    h1: "font-extrabold tracking-wide font-bold",
    h2: "font-semibold tracking-wide font-bold",
    h3: "font-semibold tracking-normal font-bold",
    h4: "font-medium tracking-normal font-bold",
    p:  "tracking-tight",
    blockquote: "relative mb-2 before:absolute before:left-0 before:top-1/2 before:w-4 before:h-[2px] before:rounded-full before:bg-emerald-500 pl-6 italic",
}

const sizes = {
    sm: "text-sm font-light leading-tight",
    md: "text-base font-normal leading-normal",
    lg: "text-2xl font-semibold leading-snug",
    xl: "text-3xl font-extrabold leading-snug",
    "2xl": "text-5xl font-extrabold leading-tight",
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
    <Component className={cn(sizes[size], variants[variant], colors[color], className)}>
        {children}
    </Component>
  )
}
