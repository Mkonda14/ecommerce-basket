"use server"

import {z} from "zod"

import { CategorySchema, TagSchema, ThemeSchema } from "@/models/category-attributs";
import { db } from "@/lib/db";


export const saveCategory = async (data: z.infer<typeof CategorySchema>) => {
    const verified = CategorySchema.safeParse(data);

    if(!verified.success) return { type: "error", message:"Category schema validation failed"}

    try {
        const category = await db.category.create({
            data:{
                ...verified.data,
                createdAt: new Date(),
            }
        })
        return { type: "success", message: `Category : ${category.name} saved successfully` }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        return { type: "error", message: `Category schema validation failed error: ${error.message}` };
    }
};

export const saveTheme = async (data: z.infer<typeof ThemeSchema>) => {
    const verified = ThemeSchema.safeParse(data);

    if(!verified.success) return { type: "error", message:"Category schema validation failed"}

    try {
        const theme = await db.theme.create({
            data:{
                name: data.name,
                description: data.description,
                createdAt: new Date(),
            }
        })
        return { type: "success", message: `Theme : ${theme.name} saved successfully`}
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        return { type: "error", message:`Theme saved failed error: ${error.message}`}
    }
};

export const saveTag = async (data: z.infer<typeof TagSchema>) => {
    const verified = TagSchema.safeParse(data);

    if(!verified.success) return { type: "error", message:"Category schema validation failed"}

    try {
        const tag = await db.tag.create({
            data:{
                ...verified.data,
                createdAt: new Date(),
            }
        })
        return { type: "success", message: `Tag : ${tag.name} saved successfully` }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        return { type: "error", message:`Tag saved failed error: ${error.message}`}
    }
};