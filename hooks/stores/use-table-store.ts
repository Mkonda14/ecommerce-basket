import { create } from "zustand";
import { createSelectors } from "./selector";

interface IDataTable {
    isLoading: boolean;
    onChangeLoading: (loading: boolean) => void;
}

export const useDataTable = createSelectors(create<IDataTable>()((set) => ({
    isLoading: true,
    onChangeLoading: (loading: boolean) => set({ isLoading: loading }),
})));