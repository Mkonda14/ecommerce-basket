"use server"

import {z} from "zod";
import { db } from "@/lib/db";
import { ActionError, authAdminAction } from "@/lib/safe-actions";

const idSchema = z.object({
    id: z.string().min(5),
})


export const deleteTagSneaker = authAdminAction
.schema(idSchema)
.action(async ({parsedInput: {id}}) =>  {
    
    try {
        const tag = await db.tagSneaker.delete({
            where: {id},
        })
        return { message: `Tag sneaker : ${tag.name} delete successfully` }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.error(error);
        throw new ActionError(`Tag sneaker failed error: ${error.message}`);
    }
});