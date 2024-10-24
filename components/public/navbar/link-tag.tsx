import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

const colorTags = {
    emerald: "bg-emerald-500",
    cyan: "bg-cyan-500",
    violet: "bg-violet-500",
}

const colorPink = {
    emerald: "border-t-emerald-500",
    cyan: "border-t-cyan-500",
    violet: "border-t-violet-500",
}

interface LinkTagProps{
    tagName: string;
    tagColor: keyof typeof colorTags;
    children: React.ReactNode;
    href?: string;
    isActive?: boolean;
}

export const LinkTag = ({tagName, tagColor, isActive, children, href="#"}: LinkTagProps) => {

    return (
        <Button variant={isActive ? "default" : "ghost"} asChild>
            <Link href={href} className="relative">
                <span className={"uppercase"}>{children}</span>
                <span className={cn("py-1 px-2 absolute -top-6 left-3/4 text-xs text-white", colorTags[tagColor])}>
                    <span className={"uppercase"}>{tagName}</span>
                    <span className={cn(`absolute z-10 border-8 border-transparent left-1 -bottom-4`, colorPink[tagColor])}></span>
                </span>
            </Link>
        </Button>
  )
}
