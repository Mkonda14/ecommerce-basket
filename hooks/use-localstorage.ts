"use client"

type BasketType = {
    id: string,
    quantity: number
}

// eslint-disable-next-line react-hooks/rules-of-hooks

export const useLocalStorage = (key: string) =>{
    const saveBasket = (value: BasketType[])=>{
        window.localStorage.setItem(key, JSON.stringify(value));
    }

    const getBasket = (): BasketType[] => {
        const basket = window.localStorage.getItem(key);
        if(basket) return JSON.parse(basket);
        return [];
    }

    const addBasket = (value: BasketType): number => {
        const baskets = getBasket();
        const basketExist = baskets.find(basket => basket.id === value.id);
        if (basketExist !== undefined) {
            basketExist.quantity++
        }
        else{
            value.quantity = 1;
            baskets.push(value);
        }
        saveBasket(baskets);
        return baskets.length;
    }

    const removeBasket = (id: string): number => {
        const baskets = getBasket();
        const removeBasket = baskets.filter(basket => basket.id !== id);
        saveBasket(removeBasket);
        return removeBasket.length;
    };

    const subtractQuantity = (id: string) => {
        const baskets = getBasket();
        const subtractQuantity = baskets.find((basket)=> basket.id === id);
        if(subtractQuantity !== undefined && subtractQuantity.quantity > 0) {
            subtractQuantity.quantity--
        }
        saveBasket(baskets);
    }

    return {saveBasket, getBasket, addBasket, removeBasket, subtractQuantity}
}