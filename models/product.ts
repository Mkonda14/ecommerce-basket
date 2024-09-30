
import {z} from "zod";

export const ProductSchema = z.object({
    name: z.string().min(3, "minimum 3 caracters"),
    model: z.string().min(3, "minimum 3 caracters"),
    description: z.string().min(15, "minimum 15 caracters"),

    price: z.string().transform((input)=> parseInt(input, 10).toFixed(2)),
    promoPrice: z.string().transform((input)=> parseInt(input, 10).toFixed()).default('0'),
    isPromo: z.boolean().default(false),

    category: z.string(),
    tags: z.array(z.any()),

    images: z.array(z.any().refine((input)=> input.size <= (1024 * 1000))),
})