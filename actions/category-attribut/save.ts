"use server"

import {z} from "zod"

import { CategorySneakerSchema, TagSneakerSchema, CategoryThemeSchema, ThemeSchema } from "@/models/category-attributs";
import { db } from "@/lib/db";


export const saveCategorySneaker = async (data: z.infer<typeof CategorySneakerSchema>) => {
    const verified = CategorySneakerSchema.safeParse(data);

    if(!verified.success) return { type: "error", message:"Category sneaker schema validation failed"}

    try {
        const category = await db.categorySneaker.create({
            data:{
                ...verified.data,
                createdAt: new Date(),
            }
        })
        return { type: "success", message: `Category sneaker : ${category.name} saved successfully` }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        return { type: "error", message: `Category sneaker schema validation failed error: ${error.message}` };
    }
};

export const saveTagSneaker = async (data: z.infer<typeof TagSneakerSchema>) => {
    const verified = TagSneakerSchema.safeParse(data);

    if(!verified.success) return { type: "error", message:"Category sneaker schema validation failed"}

    try {
        const tag = await db.tagSneaker.create({
            data:{
                ...verified.data,
                createdAt: new Date(),
            }
        })
        return { type: "success", message: `Tag sneaker : ${tag.name} saved successfully` }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        return { type: "error", message:`Tag sneaker saved failed error: ${error.message}`}
    }
};

// ------- Theme

export const saveTheme = async (data: z.infer<typeof ThemeSchema>) => {
    const verified = ThemeSchema.safeParse(data);

    if(!verified.success) return { type: "error", message:"Category schema validation failed"}

    try {
        const theme = await db.theme.create({
            data:{
                name: data.name,
                description: data.description,
                categoryId: data.category,
                createdAt: new Date(),
                image: {
                    create : {
                        publicId: data.image.public_id,
                        secureUrl: data.image.secure_url,
                    }
                }
            }
        })
        return { type: "success", message: `Theme : ${theme.name} saved successfully`}
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        return { type: "error", message:`Theme saved failed error: ${error.message}`}
    }
};

export const saveCategoryTheme = async (data: z.infer<typeof CategoryThemeSchema>) => {
    const verified = CategoryThemeSchema.safeParse(data);

    if(!verified.success) return { type: "error", message:"Category theme schema validation failed"}

    try {
        const category = await db.categoryTheme.create({
            data:{
                ...verified.data,
                createdAt: new Date(),
            }
        })
        return { type: "success", message: `Category theme : ${category.name} saved successfully` }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        return { type: "error", message: `Category theme schema validation failed error: ${error.message}` };
    }
};
