import { FaOpencart } from "react-icons/fa"; 
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Typographie } from "@/components/typographie";

export const LogoMarket = () => {
  return (
    <Button variant={"link"} className="flex items-center gap-x-4" asChild>
        <Link href={"/"}>
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-white"> <FaOpencart /> </div>
            <div className="">
                <Typographie component="h2" variant="h3" size="lg">MARKET</Typographie>
                <Typographie component="p" variant="p" size="md">Shop to Sneaker</Typographie>
            </div>
        </Link>
    </Button>
  )
}
