"use client"

import Link from "next/link"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { usePathname } from "next/navigation"

export function BreadcrumbWithCustom() {
    const paths = usePathname().split('/');
    const links = paths.map((path, idx) => {
        return {link: paths.slice(0, idx + 1).join("/") || "/", label: path || "Home"};
    })
    const end = links.pop()?.label;

    return (
        <Breadcrumb>
        <BreadcrumbList>
            {links.map(({link, label}) =>(
                <>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href={link}>{label}</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                </>
            ))}
            <BreadcrumbItem>
                <BreadcrumbPage className="font-bold">{end}</BreadcrumbPage>
            </BreadcrumbItem>
        </BreadcrumbList>
        </Breadcrumb>
    )
}
