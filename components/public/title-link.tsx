import { Typographie } from "@/components/typographie"

interface TitleLinkProps{
    children: React.ReactNode;
}

export const TitleLink = ({children}: TitleLinkProps) => {
    return (
        <Typographie 
            component="h2" 
            variant="h2"  
            size="lg"
            className="inline-block relative mb-6 pb-2 before:absolute before:w-1/2 before:h-1 before:bg-emerald-500 before:left-0 before:-bottom-1 before:rounded-lg"
        >
            {children}
        </Typographie>
    )
}
