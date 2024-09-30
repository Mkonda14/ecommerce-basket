import { Navbar } from '@/components/admin/navbar';
import { SidebarAdmin } from '@/components/admin/sidebar-admin';
import React from 'react'

interface Props{
    children: React.ReactNode;
}

export default function LayoutAdmin({children}: Props) {
  return (
    <main className='flex bg-slate-100 min-h-screen'>
        <SidebarAdmin />
        <main className='flex flex-col w-[82%]'>
            <Navbar />
            <main className='flex-grow w-full'>
                {children}
            </main>
        </main>
    </main>
  )
}
