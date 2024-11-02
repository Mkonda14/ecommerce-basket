import {z} from "zod";

export const CategorySchema = z.object({
    name: z.string(),
    designer: z.string(),
    description: z.string(),
});

export const ThemeSchema = z.object({
    name: z.string(),
    description: z.string(),
    image: z.object({
        secure_url: z.string(),
        public_id: z.string()
    })
});

export const TagSchema = z.object({
    name: z.string(),
    description: z.string(),
});