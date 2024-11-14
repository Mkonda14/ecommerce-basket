"use client";

import { create } from "zustand";

interface IDataTable {
    isLoading: boolean;
    onChangeLoading: (loading: boolean) => void;
}

export const useDataTable = create<IDataTable>()((set) => ({
    isLoading: true,
    onChangeLoading: (loading: boolean) => set({ isLoading: loading }),
}));

interface IFilter{
    data: {
        categorySneakers: string[], 
        categoryThemes: string[],
        tagSneakers: string[],
        sizes: number[],
        colors: string[],
        price: {min: number, max: number},
        sorts?: {alphabet: "asc" | "desc", price: "asc" | "desc"},
        page?: number
    };
    updatedCategorySneakers: (categories: string[])=> void;
    updatedCategoryThemes: (categories: string[])=> void;
    updatedTagSneakers: (tags: string[])=> void;
    updatedCategorySizes: (sizes: number[])=> void;
    updatedCategoryColors: (colors: string[])=> void;
    updatedCategoryPrice: (price: {min: number, max: number})=> void;
    updatedSorts: (sorts: {alphabet: "asc" | "desc", price: "asc" | "desc"})=> void;
    updatedPage: (page: number)=> void;  // Add page update hook here if needed. For now, it's not needed in this example.  // Add page update hook here if needed. For now, it's not needed in this example.  // Add page update hook here if needed. For now, it's not needed in this example.  // Add page update hook here if needed. For now, it's not needed in this example.  // Add page
}

export const useFilters = create<IFilter>()((set) => ({
    data: {
        categorySneakers: [], 
        categoryThemes: [], 
        sizes: [], 
        colors: [], 
        price: {min: 0, max: 200}, 
        sorts: {alphabet: "asc", price: "asc"}, 
        tagSneakers: [],
        page: 1,
    },
    
      
    updatedCategorySneakers: ((categories: string[])=>{
        set((state)=> ({data: {...state.data, categorySneakers: [...categories]}}))
    }),
    updatedCategoryThemes: ((categories: string[])=>{
        set((state)=> ({data: {...state.data, categoryThemes: [...categories]}}))
    }),
    updatedTagSneakers: ((tags: string[])=>{
        set((state)=> ({data: {...state.data, tagSneakers: [...tags]}}))
    }),
    updatedCategorySizes: ((sizes: number[])=>{
        set((state)=> ({data: {...state.data, sizes: [...sizes]}}))
    }),
    updatedCategoryColors: ((colors: string[])=>{
        set((state)=> ({data: {...state.data, colors: [...colors]}}))
    }),
    updatedCategoryPrice: ((price: {min: number, max: number})=>{
        set((state)=> ({data: {...state.data, price: {...price}}}))
    }),
    updatedSorts: (sorts: {alphabet: "asc" | "desc", price: "asc" | "desc"})=>{
        set((state)=> ({data: {...state.data, sorts: {...sorts}}}))
    },
    updatedPage: (page: number)=>{
        set((state)=> ({data: {...state.data, page: page}}))
    }
}));

interface IBasket{
    length: number;
    onUpdatedBasket: (length: number)=> void;
}

export const useUpdatedBasket = create<IBasket>()((set)=>({
    length: 0,
    onUpdatedBasket: (length: number)=> set({length: length})
}))