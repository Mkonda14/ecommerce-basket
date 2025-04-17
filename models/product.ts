
import {z} from "zod";

export const ProductSchema = z.object({
    marque: z.string().min(3, "minimum 3 caracters"),
    model: z.string().min(3, "minimum 3 caracters"),
    description: z.string().min(15, "minimum 15 caracters"),

    price: z.string().transform((input)=> parseInt(input, 10).toFixed(2)),
    reduction: z.string()
                .max(2, "veuillez insérer uniquement les nombres a moins de 3 chiffres").default('0'),
    isPromo: z.boolean().default(false),

    stock: z.string(),
    isCustomByGraffiti: z.boolean().default(false),

    category: z.string(),
    tags: z.array(z.object({
        label: z.string(),
        value: z.string()
    })),

    colorPrimaries: z.array(z.object({
        id: z.string().optional(),
        code: z.string(),
        name: z.string(),
        sizes: z.array(z.object({
            size: z.string(),
            quantity: z.string()
        })),
    })),
})