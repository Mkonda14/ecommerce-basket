/* eslint-disable @typescript-eslint/no-explicit-any */
import { create, StoreApi, UseBoundStore } from "zustand";

type WithSelectors<S> = S extends { getState: () => infer T }
  ? S & { use: { [K in keyof T]: () => T[K] } }
  : never;

const createSelectors = <S extends UseBoundStore<StoreApi<object>>>(_store: S) => {
  
    const store = _store as WithSelectors<typeof _store>;
  store.use = {};

  for (const k of Object.keys(store.getState())) {
    (store.use as any)[k] = () => store((s) => s[k as keyof typeof s]);
  }

  return store;
};


interface IReset {
    isReset: boolean;
    onChange: (reset: boolean) => void
}
  
export const useResetForm = createSelectors(create<IReset>()((set) => ({
    isReset: false,
    onChange: (reset) => set({ isReset: reset }),
})))