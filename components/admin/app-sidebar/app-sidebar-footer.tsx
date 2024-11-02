

import { ThemeToggle } from '@/components/theme-toggle'
import { Typographie } from '@/components/typographie'
import { Button } from '@/components/ui/button'
import { SidebarFooter } from '@/components/ui/sidebar'
import Link from 'next/link'
import React from 'react'
import { BsQuestionCircle } from 'react-icons/bs'

export const AppSidebarFooter = () => {
  return (
    <SidebarFooter>
        <Button variant={"link"} className="flex justify-between items-center gap-x-2 p-0" asChild>
            <Link href="#">
                <BsQuestionCircle className="h-5 w-5" />
                <Typographie component="p" variant="p" size="sm" className="flex-grow">Help & getting started</Typographie>
                <span className="bg-violet-200 px-1 rounded-sm">8</span>
            </Link>
        </Button>
        <ThemeToggle />
    </SidebarFooter>
  )
}
