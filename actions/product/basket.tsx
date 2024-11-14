"use server"

import {db} from "@/lib/db"

export const basketModal = async (baskets: string[])=> {
    try{
        return await db.sneaker.findMany({
            where: {
                id: {
                    in: baskets
                }
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
        throw new Error("error an get baskets from the database" + err)
    }
}