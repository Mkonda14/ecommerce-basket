"use server"

import {z} from "zod"

import { ThemeSchema } from "@/models/category-attributs";
import { db } from "@/lib/db";
import { getThemeById } from ".";
import { ActionError, authAdminAction } from "@/lib/safe-actions";


const updateThemeSchema = z.object({
    themeId: z.string().min(5),
    data: ThemeSchema,
})

export const updateTheme = authAdminAction
.schema(updateThemeSchema)
.action(async ({parsedInput: {data, themeId: id}}) => {

    const themeExists = await getThemeById(id);

    if (!themeExists) throw new ActionError("Thème not found");

    try {
        const theme = await db.theme.update({
            where: { id },
            data:{
                name: data.name,
                description: data.description,
                categoryId: data.category,
            }
        })
        return { message: `Thème : ${theme.name} updated successfully` }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.error(error);
        throw new ActionError(`Thème schema validation failed error: ${error.message}`);
    }
});