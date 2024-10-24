"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { LinkTag } from "./link-tag"

import { usePathname } from "next/navigation"

export const LignThree = () => {

  const linkCurrent = usePathname();
  console.log(linkCurrent);
  

  return (
    <section className="w-full container bg-gray-200 flex justify-between items-center">
        <div className="flex justify-between items-center gap-x-8">
          <div className="flex items-center gap-x-4">
            <Button variant={"default"} asChild>
              <Link href="/">HOME</Link>
            </Button>
            <Button variant={"ghost"} asChild>
              <Link href="#">SHOP</Link>
            </Button>

            <LinkTag tagName="NEW" isActive={linkCurrent === ""} tagColor="emerald" >NEW SNEAKER</LinkTag>
            
            <Button variant={"ghost"} asChild>
              <Link href="#">PROMOTION</Link>
            </Button>
            <Button variant={"ghost"} asChild>
              <Link href="#">ABOUT US</Link>
            </Button>
            <Button variant={"ghost"} asChild>
              <Link href="#">CONTACT US</Link>
            </Button>
            <Button variant={"ghost"} asChild>
              <Link href="#">FAQ</Link>
            </Button>
          </div>
        </div>
      </section>
  )
}
