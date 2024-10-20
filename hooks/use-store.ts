"use client";

import { create } from "zustand";

interface IDataTable {
    isLoading: boolean;
    onChangeLoading: (loading: boolean) => void;
}

export const useDataTable = create<IDataTable>((set) => ({
    isLoading: true,
    onChangeLoading: (loading: boolean) => set({ isLoading: loading }),
}));
