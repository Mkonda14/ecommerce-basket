"use client"

import { Navbar } from '@/components/admin/navbar';
import { SidebarAdmin } from '@/components/admin/sidebar-admin';
import React from 'react'

import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

interface Props{
    children: React.ReactNode;
}

export default function LayoutAdmin({children}: Props) {

  const queryClient = new QueryClient();

  return (
    <main className='flex bg-slate-100 min-h-screen'>
        <SidebarAdmin />
        <main className='flex flex-col w-[82%]'>
            <Navbar />
            <main className='flex-grow w-full'>
              <QueryClientProvider client={queryClient}>
                {children}
              </QueryClientProvider>
            </main>
        </main>
    </main>
  )
}
