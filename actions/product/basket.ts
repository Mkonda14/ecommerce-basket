"use server"

import {db} from "@/lib/db"
import { z } from "zod"

const basketModalSchema = z.string().min(5);
type TbasketModal = z.infer<typeof basketModalSchema>;

export const basketModal = async (basketId: TbasketModal)=> {
    try{
        const verified = basketModalSchema.safeParse(basketId);
        if(!verified.success) throw new Error('Invalid parameter: ' + verified.error);
        
        return await db.sneaker.findUnique({
            where: {
                id: basketId
            },
            select: {
                id: true,
                marque: true,
                model: true,
                price: true,
                promoPrice: true,
                isPromo: true,
                images: {
                    select: {
                        publicId: true
                    },
                    take: 1
                }
            },
        })
    }catch(err){
        throw new Error("error an get basket from the database" + err)
    }
}

const getBasketByKeysSchema = z.array(z.string()).optional();
type TgetBasketByKeys = z.infer<typeof getBasketByKeysSchema>;

export const getBasketByKeys = async (keys: TgetBasketByKeys)=> {
    try{
        const verified = getBasketByKeysSchema.safeParse(keys);
        if(!verified.success) throw new Error('Invalid parameter: ' + verified.error);

        if(!keys) return [];
        
        return await db.sneaker.findMany({
            where: {
                id: {
                    in: keys
                }
            },
            select: {
                id: true,
                marque: true,
                model: true,
                price: true,
                promoPrice: true,
                stock: true,
                isPromo: true,
                sizes: {
                    select: {
                        size: true,
                        quantity: true,
                    }
                },
                images: {
                    select: {
                        publicId: true
                    },
                    take: 1
                }
            },
        })
    }catch(err){
        throw new Error("error an get baskets from the database" + err)
    }
}