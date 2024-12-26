"use server"

import { db } from "@/lib/db";
import { z } from "zod";
import { transToCardCustom } from "../translate";


const CardSuggestionSchema = z.object({
    slug: z.string().optional(),
});

export const getCardSuggestions = async (params : z.infer<typeof CardSuggestionSchema>) => {
    try {
        const verified = CardSuggestionSchema.safeParse(params);
        if (!verified.success) throw new Error("invalid parameters passed to CardSuggestionSchema");

        const {slug} = verified.data;

        const themeIds = (await db.custom.findUnique({
            where: {slug},
            select:{
                themes: {
                    select:{
                        id: true,
                    }
                }
            }
        }))?.themes.map((theme) => theme.id)

        const customs = await db.custom.findMany({
            where: {
                themes: { every:  { id: { in: themeIds }  } },
                NOT: [
                    {slug},
                ],
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
            take: 3,
            orderBy: {
                createdAt: 'desc',
            },

        });

        // Filtrer pour exclure le sneaker concerné 
        const filterCustoms = customs.map((custom)=> transToCardCustom(custom));
        return filterCustoms;
        
    } catch (error) {
        console.error("Error getting customs suggestions from database:", error); 
        throw new Error("Error getting customs suggestions from database");
    }
}