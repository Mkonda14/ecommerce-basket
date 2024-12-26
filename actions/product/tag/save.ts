"use server"

import { TagSneakerSchema } from "@/models/category-attributs";
import { db } from "@/lib/db";
import { ActionError, authAdminAction } from "@/lib/safe-actions";


export const saveTagSneaker = authAdminAction
.schema(TagSneakerSchema)
.action(async ({parsedInput: data}) =>  {

    try {
        const tag = await db.tagSneaker.create({
            data:{
                ...data,
                createdAt: new Date(),
            }
        })
        return { message: `Tag sneaker : ${tag.name} saved successfully` }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.error(error);
        throw new ActionError(`Tag sneaker saved failed error: ${error.message}`);
    }
});