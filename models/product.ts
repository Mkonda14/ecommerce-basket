
import {z} from "zod";

export const ProductSchema = z.object({
    name: z.string().min(3, "minimum 3 caracters"),
    model: z.string().min(3, "minimum 3 caracters"),
    description: z.string().min(15, "minimum 15 caracters"),

    price: z.number().transform((input)=> input.toFixed(2)),
    promoPrice: z.number().transform((input)=> input.toFixed()).default(0.00),
    isPromo: z.boolean().default(false),

    images: z.array(z.any().refine((input)=> input.size <= (1024 * 1000))),
})