"use client"

type BasketType = {
    id: string,
    quantity: number,
    size: number,
}

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
        const basketExist = baskets.find(basket => basket.id === value.id && basket.size === value.size);
        if (basketExist !== undefined) {
            basketExist.quantity++;
        }
        else{
            baskets.push(value);
        }
        saveBasket(baskets);
        return baskets.length;
    }

    const removeBasket = (identifier:{id: string, size?: number}): number => {
        const baskets = getBasket();
        const removeBasket = baskets.filter(basket => ((basket.id !== identifier.id) || (basket.size !== identifier.size)));
        saveBasket(removeBasket);
        return removeBasket.length;
    };

    const subtractQuantity = (id: string, size: number) => {
        const baskets = getBasket();
        const subQuantity = baskets.find((basket)=> ((basket.id === id) && (basket.size === size)));
        if(subQuantity && subQuantity.quantity > 1) {
            subQuantity.quantity--
        }
        saveBasket(baskets);
    }

    const addedQuantity = (id: string, size: number, max: number) => {
        const baskets = getBasket();
        const addQuantity = baskets.find((basket)=> ((basket.id === id) && (basket.size === size)));
        if(addQuantity && addQuantity.quantity < max) {
            addQuantity.quantity++;
        }
        saveBasket(baskets);
    }

    const updatedSize = (id: string, size: number, newSize: number) => {
        const baskets = getBasket();
        const updated = baskets.find((basket)=> ((basket.id === id) && (basket.size === size)));
        if(updated) {
            updated.size = newSize;
            saveBasket(baskets);
            return true;
        }
        saveBasket(baskets);
    }

    return {saveBasket, getBasket, addBasket, removeBasket, subtractQuantity, addedQuantity, updatedSize}
}