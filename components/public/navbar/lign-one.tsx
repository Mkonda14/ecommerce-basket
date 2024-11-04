"use client"

import { BtnAuth } from "@/components/btn-auth"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import { AiOutlineUserAdd } from "react-icons/ai"
import { MdOutlineManageAccounts } from "react-icons/md"

export const LignOne = () => {

    return (
        <section className="w-full container bg-gray-200 flex justify-between items-center">
            <div className="flex items-center gap-x-4 border-b">
                <Select onValueChange={(val)=> val} defaultValue={'en'}>
                    <SelectTrigger className="py-5">
                        <SelectValue placeholder="Select a verified category to display" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value={"en"}>English</SelectItem>
                        <SelectItem value={"fr"}>Français</SelectItem>
                    </SelectContent>
                </Select>

                <Select onValueChange={(val)=> val} defaultValue={'usd'}>
                    <SelectTrigger className="py-5">
                        <SelectValue placeholder="Select a verified category to display" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value={"usd"}>USD</SelectItem>
                        <SelectItem value={"eur"}>EUR</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="flex items-center gap-x-4">
                <Button variant={"default"} asChild>
                    <Link href="#" className="flex gap-x-2">
                        <MdOutlineManageAccounts className="w-5 h-5" /> <span>My Account</span>
                    </Link>
                </Button>
                <Button variant={"outline"} size={"icon"} asChild>
                    <Link href="/auth/sign-up"><AiOutlineUserAdd className="w-5 h-5" /></Link>
                </Button>
                <BtnAuth />
            </div>
        </section>
    )
}
