import { create } from "zustand";
import { createSelectors } from "./selector";


interface IReset {
    isReset: boolean;
    onChange: (reset: boolean) => void
}
  
export const useResetForm = createSelectors(create<IReset>()((set) => ({
    isReset: false,
    onChange: (reset) => set({ isReset: reset }),
})))