"use server"

import {z} from "zod"

import { CategorySchema, TagSchema, ThemeSchema } from "@/models/category-attributs";



export const saveCategory = (data: z.infer<typeof CategorySchema>) => {
    const verified = CategorySchema.safeParse(data);

    if(!verified.success) return { type: "error", message:"Category schema validation failed"}
};

export const saveTheme = (data: z.infer<typeof ThemeSchema>) => {
    const verified = ThemeSchema.safeParse(data);

    if(!verified.success) return { type: "error", message:"Category schema validation failed"}
};

export const saveTag = (data: z.infer<typeof TagSchema>) => {
    const verified = TagSchema.safeParse(data);

    if(!verified.success) return { type: "error", message:"Category schema validation failed"}
};