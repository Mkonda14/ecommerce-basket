import { create } from "zustand";
import { createSelectors } from "./selector";

interface IBasket{
    length: number;
    onUpdatedBasket: (length: number)=> void;
}

export const useUpdatedBasket = createSelectors(create<IBasket>()((set)=>({
    length: 0,
    onUpdatedBasket: (length: number)=> set({length: length})
})));