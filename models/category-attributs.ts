import {z} from "zod";

export const CategorySneakerSchema = z.object({
    name: z.string(),
    designer: z.string(),
    description: z.string(),
});

export const TagSneakerSchema = z.object({
    name: z.string(),
    description: z.string(),
});

// -- Thème

export const ThemeSchema = z.object({
    name: z.string(),
    description: z.string(),
    category: z.string(),
    image: z.object({
        secure_url: z.string().default(""),
        public_id: z.string().default("")
    })
});

export const CategoryThemeSchema = z.object({
    name: z.string(),
    globalName: z.string(),
    description: z.string(),
});
