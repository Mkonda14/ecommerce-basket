

import { Typographie } from '@/components/typographie'
import { Button } from '@/components/ui/button'
import { SidebarHeader } from '@/components/ui/sidebar'
import React from 'react'
import { MdDashboard } from 'react-icons/md'

export const AppSidebarHeader = () => {
  return (
    <SidebarHeader >
        <header className="flex gap-x-2">
            <Button variant={"outline"} size={"icon"} className="w-12 h-12 p-0 rounded-none border-none shadow-none">
                <MdDashboard className="w-14 h-14" />
            </Button>
            <div className="">
                <Typographie component="h2" variant="h2" size="lg">Dashboard</Typographie>
                <Typographie component="p" variant="p" size="sm" className="-mt-2">Policy Privacy</Typographie>
            </div>
        </header>
    </SidebarHeader>
  )
}
