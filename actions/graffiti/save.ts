"use server"

import {db} from "@/lib/db";
import { ActionError, authAdminAction } from "@/lib/safe-actions";
import { GraffitiSchema } from "@/models/graffiti";

export const saveGraffiti = authAdminAction
.schema(GraffitiSchema)
.action(async ({parsedInput: data}) =>  {
    
    try {
        const category = await db.graffiti.create({
            data: {
                name: data.name,
                description: data.description,
                category: {
                    connect: {
                        id: data.category
                    }
                },
                textMaxLength: parseInt(data.textMaxLength || "1"),
                textMaxWords: parseInt(data.textMaxWords || "1"),
                textMinLength: parseInt(data.textMinLength || "1"),
                defaultColors: {
                    create: data.defaultColors.map((color) => ({
                        color: color.code,
                        name: color.name,
                    }))
                },
                image: {
                    create: {
                        publicId: data.image.public_id,
                        secureUrl: data.image.secure_url,
                    }
                },
                createdAt: new Date()
            }
        })
        return { message: `Graffiti : ${category.name} saved successfully` }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.error(error);
        throw new ActionError(`Graffiti save failed error: ${error.message}`);
    }
});