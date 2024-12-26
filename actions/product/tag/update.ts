"use server"

import {z} from "zod"

import { TagSneakerSchema } from "@/models/category-attributs";
import { db } from "@/lib/db";
import { getTagSneakerById } from ".";
import { ActionError, authAdminAction } from "@/lib/safe-actions";


const updateTagSneakerSchema = z.object({
    tagId: z.string().min(5),
    data: TagSneakerSchema,
})

export const updateTagSneaker = authAdminAction
.schema(updateTagSneakerSchema)
.action(async ({parsedInput: {data, tagId: id}}) => {
   
    const tagExists = await getTagSneakerById(id);

    if (!tagExists) throw new ActionError("Tag sneaker not found");

    try {
        const tag = await db.tagSneaker.update({
            where: { id },
            data:{
                ...data,
            }
        })
        return { message: `Tag sneaker : ${tag.name} updated successfully` }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.error(error);
        throw new ActionError(`Tag sneaker schema validation failed error: ${error.message}`);
    }
});