"use server"

import * as z from "zod";

import { verificationTokenSchema } from "@/models";
import { getUserByEmail, getVerificationTokenByToken } from "./auth";
import { db } from "@/lib/db";

export const verificationToken = async (data: z.infer<typeof verificationTokenSchema>) => {
    const valid = verificationTokenSchema.safeParse(data);
    if (!valid.success) return { msg: 'Invalid token', type: "error" }

    const { token } = valid.data;

    const tokenExists = await getVerificationTokenByToken(token);
    if (!tokenExists) return { msg: 'Token is invalid', type: "error" }

    const isEspires = new Date() > new Date(tokenExists.expires);
    if (isEspires) return { msg: 'Token is expired', type: "error" }

    const userExists = await getUserByEmail(tokenExists.email);
    if (!userExists) return { msg: 'Token is invalid', type: "error" }

    await db.user.update({
        where: {
            id: userExists.id,
        },
        data: {
            emailVerified: new Date(),
        },
    })

    return { msg: "email virified successfully", type: "success"}
};