import { Typographie } from "@/components/typographie";
import { IconType } from "react-icons/lib"

interface CardServiceProps{
    icon: IconType;
    title: string;
    children: React.ReactNode;
}

export const CardService = ({icon: Icon, title, children}: CardServiceProps) => {
  return (
    <article className="w-1/5 h-[300px] bg-[#FAFAFA] space-y-6 px-6 py-8 shadow-md">
        <div className="mb-4"> <Icon className="h-10 w-10" /> </div>
        <Typographie component="h3" variant="h3" size="lg" className="">
            {title}
        </Typographie>
        <Typographie component="p" variant="p" size="md" className="">
            {children}
        </Typographie>
    </article>
  )
}
 