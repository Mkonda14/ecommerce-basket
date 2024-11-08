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
        sorts?: {alphabet: "asc" | "desc", price: "asc" | "desc"}
    };
    updatedCategorySneakers: (categories: string[])=> void;
    updatedCategoryThemes: (categories: string[])=> void;
    updatedTagSneakers: (tags: string[])=> void;
    updatedCategorySizes: (sizes: number[])=> void;
    updatedCategoryColors: (colors: string[])=> void;
    updatedCategoryPrice: (price: {min: number, max: number})=> void;
    updatedSorts: (sorts: {alphabet: "asc" | "desc", price: "asc" | "desc"})=> void;
}

export const useFilters = create<IFilter>()((set) => ({
    data: {
        categorySneakers: [], 
        categoryThemes: [], 
        sizes: [], 
        colors: [], 
        price: {min: 0, max: 0}, 
        sorts: {alphabet: "asc", price: "asc"}, 
        tagSneakers: []
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
    }
}));
