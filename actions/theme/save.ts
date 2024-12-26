"use server"

import { ThemeSchema } from "@/models/category-attributs";
import { db } from "@/lib/db";
import { ActionError, authAdminAction } from "@/lib/safe-actions";


export const saveTheme = authAdminAction
.schema(ThemeSchema)
.action(async ({parsedInput: data}) => {

    try {
        const theme = await db.theme.create({
            data:{
                name: data.name,
                description: data.description,
                categoryId: data.category,
                createdAt: new Date(),
                image: (data.image?.public_id ) ? {
                    create : {
                        publicId: data.image?.public_id,
                        secureUrl: data.image?.secure_url,
                    }
                } : {}
            }
        })
        return { message: `Theme : ${theme.name} saved successfully`}
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.error(error);
        throw new ActionError(`Theme saved failed error: ${error.message}`);
    }
});