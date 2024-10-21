"use server"

import {z} from "zod"

import { CategorySchema, TagSchema, ThemeSchema } from "@/models/category-attributs";
import { db } from "@/lib/db";
import { getCategoryById, getTagById, getThemeById } from ".";

export const updateCategory = async (id: string, data: z.infer<typeof CategorySchema>) => {
    const verified = CategorySchema.safeParse(data);

    if(!verified.success) return { type: "error", message:"Category schema validation failed"}

    const categoryExists = await getCategoryById(id);

    if (!categoryExists) return { type: "error", message: "Category not found" }

    try {
        const category = await db.category.update({
            where: { id },
            data:{
                ...verified.data,
            }
        })
        return { type: "success", message: `Category : ${category.name} updated successfully` }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        return { type: "error", message: `Category schema validation failed error: ${error.message}` };
    }
};

export const updateTag = async (id: string, data: z.infer<typeof TagSchema>) => {
    const verified = TagSchema.safeParse(data);

    if(!verified.success) return { type: "error", message:"Tag schema validation failed"}

    const tagExists = await getTagById(id);

    if (!tagExists) return { type: "error", message: "Tag not found" }

    try {
        const tag = await db.tag.update({
            where: { id },
            data:{
                ...verified.data,
            }
        })
        return { type: "success", message: `Tag : ${tag.name} updated successfully` }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        return { type: "error", message: `Tag schema validation failed error: ${error.message}` };
    }
};

export const updateTheme = async (id: string, data: z.infer<typeof ThemeSchema>) => {
    const verified = ThemeSchema.safeParse(data);

    if(!verified.success) return { type: "error", message:"Theme schema validation failed"}

    const themeExists = await getThemeById(id);

    if (!themeExists) return { type: "error", message: "Theme not found" }

    try {
        const theme = await db.theme.update({
            where: { id },
            data:{
                ...verified.data,
            }
        })
        return { type: "success", message: `Thème : ${theme.name} updated successfully` }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        return { type: "error", message: `Thème schema validation failed error: ${error.message}` };
    }
};