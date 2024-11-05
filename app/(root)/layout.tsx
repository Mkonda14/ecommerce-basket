"use client";

import React from 'react';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Navbar } from '@/components/public/navbar';
import { Subscribe } from '@/components/public/subscribe';
import { Footer } from '@/components/public/footer';

interface Props {
    children: React.ReactNode;
}

export default function LayoutClient({ children }: Props) {
    const queryClient = new QueryClient();

    return (
        <QueryClientProvider client={queryClient}>
            <Navbar />
                {children}
            <Subscribe />
            <Footer />
        </QueryClientProvider>
    );
}
