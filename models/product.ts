
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
    tags: z.array(z.object({
        label: z.string(),
        value: z.string()
    })),

    stock: z.string(),

    colors: z.object({
        primary: z.object({
            code: z.string(),
            name: z.string()
        }),
        secondary: z.array(z.object({
            code: z.string(),
            name: z.string()
        })).optional(),
    }),

    sizes: z.array(z.object({
        size: z.string(),
        quantity: z.string()
    })),

    images: z.array(z.object({
        secure_url: z.string().default(""),
        public_id: z.string().default("")
    })).optional(),
})