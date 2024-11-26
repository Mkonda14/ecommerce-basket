"use server"

import * as z from "zod";
import bcrypt from "bcryptjs";

import { signUpSchema } from "@/models";
import { getUserByEmail } from "./auth";
import { db } from "@/lib/db";
import { resendVerificationToken } from "@/lib/resend-mail";
import { generateVerificationToken } from "@/lib/generate-token";

export const signUp = async (data: z.infer<typeof signUpSchema>) => {
    const valid = signUpSchema.safeParse(data);
    if (!valid.success) return {msg: 'Invalid data', type: "error"}

    console.log(JSON.stringify(valid.data));

    const {firstname, lastname, email, password} = valid.data;
    const userExists = await getUserByEmail(email);
    if (userExists) return {msg: 'User already exists', type: "error"}

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await db.user.create({
        data:{
            firstname,
            lastname,
            email,
            password: passwordHash
        }
    })

    const token = await generateVerificationToken(user.email as string);
    await resendVerificationToken(token, email);

    return {msg: "user created successfully", type: "success"};
}