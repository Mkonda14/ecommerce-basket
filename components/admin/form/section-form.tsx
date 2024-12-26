
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { BiArrowBack } from "react-icons/bi";


const colors = {
    emerald: "bg-emerald-500",
    cyan: "bg-cyan-500",
    violet: "bg-violet-500",
}

interface SectionFormProps{
    title: string;
    color: keyof typeof colors,
    isFirst?: boolean,
    backHref?: string,
    children: React.ReactNode,
    description?: string
}

export const SectionForm = ({title, color, isFirst, children, backHref = "#", description}: SectionFormProps) => {
  return (
    <Card className="w-full p-4 bg-white space-y-6 rounded-lg">
        <CardHeader className="">
            <div className="w-full flex items-center justify-between">
                <div className="flex items-center gap-x-2">
                    <div className={cn("h-8 w-3", colors[color])}></div>
                    <div className="">
                        <CardTitle>{title}</CardTitle>
                        <CardDescription>{description || "Lorem ipsum dolor sit amet consectetur adipisicing."}</CardDescription>
                    </div>
                </div>
                {isFirst && (
                    <Button variant={"outline"} className="space-x-2 px-2" asChild>
                        <Link href={backHref}>
                            <BiArrowBack />
                            <span>Back</span>
                        </Link>
                    </Button>
                )}
            </div>
        </CardHeader>
        <CardContent className="space-y-8">
            {children}
        </CardContent>
    </Card>
  )
}
