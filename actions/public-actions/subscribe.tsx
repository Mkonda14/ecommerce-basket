"use server"

import { db } from "@/lib/db"
import { actionClient, ActionError } from "@/lib/safe-actions"
import { z } from "zod"

const EmailSchama = z.object({
    email: z.string().email(),
}) 

export const subscribe = actionClient
    .schema(EmailSchama)
    .action(async ({parsedInput: {email}})=> {
        try {
            await db.newLetter.create({
                data: {
                    email,
                    createdAt: new Date(),
                }
            })

            return {
                message: `subscribing successfully`,
            };

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.error("Error to subscribe");
            throw new ActionError("Error executing try again");
        }
    })