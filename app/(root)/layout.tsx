"use client";

import React from 'react';
import { Navbar } from '@/components/public/navbar';
import { Subscribe } from '@/components/public/subscribe';
import { Footer } from '@/components/public/footer';

interface Props {
    children: React.ReactNode;
}

export default function LayoutClient({ children }: Props) {

    return (
        <>
            <Navbar />
                {children}
            <Subscribe />
            <Footer />
            
        </>
    );
}
