"use server"

import { db } from "@/lib/db"


type TFilter = {
    categorySneakers: string[],
    categoryThemes: string[],
}

export const filterSneaker = (data: TFilter) => {

    try {
        return db.sneaker.findMany({
            where: {
                category: {
                    id: {
                        in: data.categorySneakers
                    }
                },
            },

            select:{
                id: true,
                marque: true,
                model: true,
                price: true,
                isPromo: true,
                stock: true,
                promoPrice: true,
                images:{
                    select:{
                        publicId: true,
                    },
                    take: 1,
                },
                sizes: {
                    select:{
                        size: true,
                        quantity: true,
                    },
                },
                colorSecondaries:{
                    select:{
                        color: true,
                        name: true,
                    },
                },
                tags:{
                    select:{
                        name: true
                    },
                    take: 3
                },
            },
        })
    } catch (error) {
        console.error(error);
    }
}

