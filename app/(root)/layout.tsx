"use client"

import React from 'react'

import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import { SessionProvider } from 'next-auth/react';

interface Props{
    children: React.ReactNode;
}

export default function LayoutAdmin({children}: Props) {

  const queryClient = new QueryClient();

  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </SessionProvider>
  )
}
