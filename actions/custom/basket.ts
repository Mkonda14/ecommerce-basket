"use server"

import {db} from "@/lib/db"
import { z } from "zod"
import { transToCardCustom } from "../translate";

const basketModalSchema = z.string().min(5);
type TbasketModal = z.infer<typeof basketModalSchema>;

export const basketModal = async (basketId: TbasketModal)=> {
    try{
        const verified = basketModalSchema.safeParse(basketId);
        if(!verified.success) throw new Error('Invalid parameter: ' + verified.error);
        
        const custom = await db.custom.findUnique({
            where: {
                id: basketId
            },
            select: {
                id: true,
                slug: true,
                name: true,
                price: true,
                colorSecondaries: {
                    select: {
                        color: true,
                        name: true,
                    }
                },
                colorPrimary:{
                    select:{
                        sneaker: {
                            select:  {
                                marque: true,
                                model: true,
                                price: true,
                                reduction: true,
                                isPromo: true,
                                isCustomByGraffiti: true,
                                tags: {
                                    select: {
                                        name: true
                                    }
                                }
                            }
                        },
                        sizes: {
                            select: {
                                size: true,
                                quantity: true,
                            }
                        }
                    }
                },
                images: {
                    select: {
                        publicId: true
                    },
                    take: 1
                },
            },
        })

        return transToCardCustom(custom)

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
        
        const customs = await db.custom.findMany({
            where: {
                id: {
                    in: keys
                }
            },
            select: {
                id: true,
                slug: true,
                name: true,
                price: true,
                colorSecondaries: {
                    select: {
                        color: true,
                        name: true,
                    }
                },
                colorPrimary:{
                    select:{
                        sneaker: {
                            select:  {
                                marque: true,
                                model: true,
                                price: true,
                                reduction: true,
                                isPromo: true,
                                isCustomByGraffiti: true,
                                tags: {
                                    select: {
                                        name: true
                                    }
                                }
                            }
                        },
                        sizes: {
                            select: {
                                size: true,
                                quantity: true,
                            }
                        }
                    }
                },
                images: {
                    select: {
                        publicId: true
                    },
                    take: 1
                },
            },
        })

        return customs.map((custom)=> transToCardCustom(custom))

    }catch(err){
        throw new Error("error an get baskets from the database" + err)
    }
}