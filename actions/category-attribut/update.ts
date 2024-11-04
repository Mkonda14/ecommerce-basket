"use server"

import {z} from "zod"

import { CategorySneakerSchema, TagSneakerSchema, CategoryThemeSchema, ThemeSchema } from "@/models/category-attributs";
import { db } from "@/lib/db";
import { getCategorySneakerById, getTagSneakerById, getCategoryThemeById, getThemeById } from ".";

export const updateCategorySneaker = async (id: string, data: z.infer<typeof CategorySneakerSchema>) => {
    const verified = CategorySneakerSchema.safeParse(data);

    if(!verified.success) return { type: "error", message:"Category sneaker schema validation failed"}

    const categoryExists = await getCategorySneakerById(id);

    if (!categoryExists) return { type: "error", message: "Category sneaker not found" }

    try {
        const category = await db.categorySneaker.update({
            where: { id },
            data:{
                ...verified.data,
            }
        })
        return { type: "success", message: `Category sneaker : ${category.name} updated successfully` }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        return { type: "error", message: `Category sneaker schema validation failed error: ${error.message}` };
    }
};

export const updateTagSneaker = async (id: string, data: z.infer<typeof TagSneakerSchema>) => {
    const verified = TagSneakerSchema.safeParse(data);

    if(!verified.success) return { type: "error", message:"Tag sneaker schema validation failed"}

    const tagExists = await getTagSneakerById(id);

    if (!tagExists) return { type: "error", message: "Tag sneaker not found" }

    try {
        const tag = await db.tagSneaker.update({
            where: { id },
            data:{
                ...verified.data,
            }
        })
        return { type: "success", message: `Tag sneaker : ${tag.name} updated successfully` }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        return { type: "error", message: `Tag sneaker schema validation failed error: ${error.message}` };
    }
};

// ---- Thème

export const updateTheme = async (id: string, data: z.infer<typeof ThemeSchema>) => {
    const verified = ThemeSchema.safeParse(data);

    if(!verified.success) return { type: "error", message:"Thème schema validation failed"}

    const themeExists = await getThemeById(id);

    if (!themeExists) return { type: "error", message: "Thème not found" }

    try {
        const theme = await db.theme.update({
            where: { id },
            data:{
                name: data.name,
                description: data.description,
                categoryId: data.category,
            }
        })
        return { type: "success", message: `Thème : ${theme.name} updated successfully` }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        return { type: "error", message: `Thème schema validation failed error: ${error.message}` };
    }
};

export const updateCategoryTheme = async (id: string, data: z.infer<typeof CategoryThemeSchema>) => {
    const verified = CategoryThemeSchema.safeParse(data);

    if(!verified.success) return { type: "error", message:"Category thème schema validation failed"}

    const categoryExists = await getCategoryThemeById(id);

    if (!categoryExists) return { type: "error", message: "Category thème not found" }

    try {
        const category = await db.categoryTheme.update({
            where: { id },
            data:{
                ...verified.data,
            }
        })
        return { type: "success", message: `Category thème : ${category.name} updated successfully` }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        return { type: "error", message: `Category thème schema validation failed error: ${error.message}` };
    }
};