import { Typographie } from "@/components/typographie";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { BiArrowBack } from "react-icons/bi";


const colors = {
    emerald: "bg-emerald-200",
    cyan: "bg-cyan-200",
    violet: "bg-violet-200",
}

interface SectionFormProps{
    title: string;
    color: keyof typeof colors,
    isFirst?: boolean,
    backHref?: string,
    children: React.ReactNode
}

export const SectionForm = ({title, color, isFirst, children, backHref = "#"}: SectionFormProps) => {
  return (
    <section className="p-4 bg-white space-y-6 rounded-lg">
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-x-2">
                <div className={cn("h-8 w-3", colors[color])}></div>
                <Typographie component="h2" variant="h2" size="lg">{title}</Typographie>
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
        <div className="space-y-8">
            {children}
        </div>
    </section>
  )
}
