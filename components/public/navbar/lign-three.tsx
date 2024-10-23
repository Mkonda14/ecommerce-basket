import { Button } from "@/components/ui/button"
import Link from "next/link"

export const LignThree = () => {
  return (
    <section className="h-3/4 w-full container bg-gray-200 flex justify-between items-center py-4">
        <div className="flex justify-between items-center gap-x-8">
          <div className="flex items-center gap-x-4">
            <Button variant={"link"} asChild>
              <Link href="/">HOME</Link>
            </Button>
            <Button variant={"link"} asChild>
              <Link href="#">SHOP</Link>
            </Button>
            <Button variant={"link"} asChild>
              <Link href="#">NEW</Link>
            </Button>
            <Button variant={"link"} asChild>
              <Link href="#">SALE</Link>
            </Button>
            <Button variant={"link"} asChild>
              <Link href="#">ABOUT</Link>
            </Button>
            <Button variant={"link"} asChild>
              <Link href="#">FAQ</Link>
            </Button>
          </div>
          <div className="flex items-center gap-x-4"></div>
        </div>
      </section>
  )
}
