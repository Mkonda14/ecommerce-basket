
import {z} from "zod";

export const CustomSchema = z.object({
    name: z.string().min(3, "minimum 3 caracters"),
    description: z.string().min(15, "minimum 15 caracters"),

    price: z.string().transform((input)=> parseInt(input, 10).toFixed(2)),
    themes: z.array(z.string()).optional(),

    colorPrimary: z.string(),
    categories: z.array(z.object({
        label: z.string(),
        value: z.string()
    })),

    colorSecondaries: z.array(z.object({
        code: z.string(),
        name: z.string()
    }).optional()).optional(),
    

    images: z.array(z.object({
        secure_url: z.string().default(""),
        public_id: z.string().default("")
    })).optional(),
})


export const CategoryCustomSchema = z.object({
    name: z.string().min(1, "Le nom est requis").max(100, "Le nom ne doit pas dépasser 100 caractères"),
    description: z.string().min(1, "La description est requise"),
    maintenance: z.string().min(1, "Les informations de maintenance sont requises"),
    properties: z.string().min(1, "Les propriétés sont requises"),
    materials: z.string().min(1, "Les matériaux sont requis"),
    creationTime: z.date(),
});


