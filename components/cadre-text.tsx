"use client"

import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";

const variants = {
    h1: "font-extrabold tracking-wide",
    h2: "font-semibold tracking-wide",
    h3: "font-semibold tracking-normal",
    h4: "font-medium tracking-normal",
}

const initialStyle = `relative inline-block mt-4 p-2 border 
                    before:absolute before:left-0 before:top-0 before:-translate-x-1/2 before:-translate-y-1/2 before:w-[3px] before:h-3 before:rounded-full
                    after:absolute after:left-0 after:top-0 after:-translate-x-1/2 after:-translate-y-1/2 after:w-3 after:h-[3px] after:rounded-full`

const sizes = {
    sm: "text-sm font-light leading-tight",
    md: "text-base font-normal leading-normal",
    lg: "text-2xl font-semibold leading-snug",
    xl: "text-3xl font-extrabold leading-snug",
    "2xl": "text-5xl font-extrabold leading-tight",
}

const borderColor ={
    emerald: "border-emerald-300",
    cyan: "border-cyan-300",
    violet: "border-violet-300",
}

const colors ={
    emerald: "before:bg-emerald-500 after:bg-emerald-500 before:shadow-emerald-500 after:shadow-emerald-500",
    cyan: "before:bg-cyan-500 after:bg-emerald-500",
    violet: "before:bg-violet-500 after:bg-emerald-500",
}

interface TypoProps{
    variant?: keyof typeof variants;
    size?: keyof typeof sizes;
    color?: keyof typeof colors;
    component: "h1" | "h2" | "h3" | "h4";
    className?: string;
    children: React.ReactNode;
}

export const CadreText = ({variant = "h3", component: Component, size = "md", color="emerald", className, children}: TypoProps) => {
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const titleRef = useRef<any>(null);

    useEffect(()=>{
      const height = titleRef.current?.offsetHeight;  
      const width = titleRef.current?.offsetWidth; 

      titleRef.current?.style.setProperty('--height', `${height - 2}px`);
      titleRef.current?.style.setProperty('--width', `${width - 2}px`);
    }, [])

    
    return (
        <Component 
            style={{
            }} 
            ref={titleRef} 
            className={cn(  variants[variant], 
                            sizes[size], 
                            colors[color], 
                            borderColor[color], 
                            initialStyle, 
                            className,
                            "cadre-text")
                        }
        >
            {children}
        </Component>
    )
}
