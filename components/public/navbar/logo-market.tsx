import { FaOpencart } from "react-icons/fa"; 
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Typographie } from "@/components/typographie";

export const LogoMarket = () => {
  return (
    <Button variant={"link"} className="flex items-center gap-x-4" asChild>
        <Link href={"/"}>
            <div className="w-12 h-12 rounded-full flex items-center justify-center bg-slate-900 text-white"> 
              <FaOpencart className="w-8 h-8" /> 
            </div>
            <div className="">
                <Typographie component="h2" variant="h3" size="lg">MARKET</Typographie>
                <Typographie component="p" variant="p" size="md">Shop to Sneaker</Typographie>
            </div>
        </Link>
    </Button>
  )
}
