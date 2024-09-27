
import {z} from "zod";

export const ProductSchema = z.object({
    name: z.string().min(3, "minimum 3 caracters"),
    model: z.string().min(3, "minimum 3 caracters"),
    description: z.string().min(15, "minimum 15 caracters"),
    price: z.number().transform((input)=> parseFloat(input.toString())),
    pricePromo: z.number().transform((input)=> parseFloat(input.toString())),
    isPromo: z.boolean().default(false),

    images: z.array(z.any().refine((input)=> input.size() < 50000, "images est trés lourd")),

    colors: z.array(z.object({
        color: z.string().min(4, "veuillez que ca puisse être un code couleur hexadecimal"),
        quantite: z.number().min(1, "Quantite doit être superieur a zero")
    })),

    sizes: z.array(z.object({
        size: z.number(),
        quantite: z.number().min(1, "Quantite doit être superieur a zero")
    })),

    category: z.string(),
})