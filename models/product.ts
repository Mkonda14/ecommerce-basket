
import {z} from "zod";

export const ProductSchema = z.object({
    marque: z.string().min(3, "minimum 3 caracters"),
    model: z.string().min(3, "minimum 3 caracters"),
    description: z.string().min(15, "minimum 15 caracters"),

    price: z.string().transform((input)=> parseInt(input, 10).toFixed(2)),
    promoPrice: z.string().transform((input)=> parseInt(input, 10).toFixed()).default('0'),
    isPromo: z.boolean().default(false),

    category: z.string(),
    themes: z.array(z.string()).refine((value) => value.some((item) => item), {
        message: "You have to select at least one item.",
    }),
    tags: z.array(z.any().transform((tag)=> tag.value)),

    stock: z.string().transform((input)=> parseInt(input, 10)),

    colors: z.object({
        primary: z.object({
            code: z.string(),
            name: z.string()
        }),
        secondary: z.array(z.object({
            code: z.string(),
            name: z.string()
        })),
    }),

    sizes: z.array(z.object({
        size: z.string().transform((input)=> parseInt(input)),
        quantity: z.string().transform((input)=> parseInt(input))
    })),

    images: z.array(z.object({
        secure_url: z.string(),
        public_id: z.string()
    })),
})