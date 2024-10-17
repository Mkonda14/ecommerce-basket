import { LoaderSpin } from "@/components/loader-spin";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export interface LoadingEmptyProps{
    loading?: boolean;
    label: string;
    href?: string;
}

export const LoadingEmpty = ({loading, href="#", label}: LoadingEmptyProps) => {


    return (
        <div className="w-full h-20 flex justify-center items-center">
            {loading ? 
                <LoaderSpin /> : (
                <Button>
                    <Link href={href}> {label} </Link>
                </Button>
            )}
        </div>
    )      

}
