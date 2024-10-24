"use client"

type BasketType = {
    id: string,
    quantity: number
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

    const addBasket = (value: BasketType) => {
        const baskets = getBasket();
        const basketExist = baskets.find(basket => basket.id === value.id);
        if (basketExist){
            basketExist.quantity++
        }
        else{
            baskets.push(value);
        }
        saveBasket(baskets);
    }

    const removeBasket = (id: string) => {
        const baskets = getBasket();
        const removeBasket = baskets.filter(basket => basket.id !== id);
        saveBasket(removeBasket);
    };

    const subtractQuantity = (id: string) => {
        const baskets = getBasket();
        const subtractQuantity = baskets.map((basket)=>{
            if(basket.id === id) basket.quantity - 1;
            return basket;
        })
        saveBasket(subtractQuantity);
    }

    return {saveBasket, getBasket, addBasket, removeBasket, subtractQuantity}
}