"use server"

import * as z from "zod";

import { forgotPasswordSchema } from "@/models";
import { getUserByEmail } from "./auth";
import { generateResetPasswordToken } from "@/lib/generate-token";
import { resendResetPasswordToken } from "@/lib/resend-mail";

export const forgotPassword = async (data: z.infer<typeof forgotPasswordSchema>) => {
    const valid = forgotPasswordSchema.safeParse(data);
    if (!valid.success) return { msg: 'Invalid email', type: "error" };

    const { email } = valid.data;
    const userExists = await getUserByEmail(email);
    if (!userExists || !userExists.email) return { msg: 'User does not exist', type: "error" };

    const token = await generateResetPasswordToken(email);
    await resendResetPasswordToken(token, email);

    return { msg: 'Reset password link sent successfully', type: "success" };

}