"use server"

import * as z from "zod";
import bcrypt from "bcryptjs";

import { getResetPasswordTokenByToken, getUserByEmail } from "./auth"
import { resetPasswordSchema } from "@/models";
import { db } from "@/lib/db";

export const resetPassword = async (data: z.infer<typeof resetPasswordSchema>, token: string) => {
    const valid = resetPasswordSchema.safeParse(data);
    if(!valid.success) return {msg: "Invalid reset password", type: "error"}

    const resetPasswordToken = await getResetPasswordTokenByToken(token);
    if (!resetPasswordToken) return { msg: 'Token is invalid', type: "error" }

    const isEspires = new Date() > new Date(resetPasswordToken.expires);
    if (isEspires) return { msg: 'Token has expired', type: "error" }

    const userExists = await getUserByEmail(resetPasswordToken.email);
    if (!userExists) return { msg: 'Token is invalid', type: "error"}

    const { password } = valid.data;
    const passwordHash = await bcrypt.hash(password, 10)

    await db.user.update({
        where:{
            id: userExists.id
        },
        data: {
            password: passwordHash
        }
    })

    return { msg: "reset password successfully", type: "success"}
}