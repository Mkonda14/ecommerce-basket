"use client"

import { Navbar } from '@/components/admin/navbar';
import React from 'react'

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/admin/app-sidebar"

import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools}

interface Props{
    children: React.ReactNode;
}

export default function LayoutAdmin({children}: Props) {

  const queryClient = new QueryClient();

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className='flex flex-col w-full relative bg-slate-100'>
          <SidebarTrigger className='absolute top-4 -left-2 w-8 h-8' />
            <Navbar />
            <main className='flex-grow w-full'>
              <QueryClientProvider client={queryClient}>
                {children}

              </QueryClientProvider>
            </main>
        </main>
    </SidebarProvider>
  )
}
