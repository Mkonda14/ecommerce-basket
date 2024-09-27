"use server"

import { getResetPasswordTokenByEmail, getVerificationTokenByEmail } from "@/actions/auth";
import crypto from "crypto";

import { v4 as uuidv4 } from "uuid";
import { db } from "./db";

export const generateVerificationToken = async (email: string) =>{
    const token = crypto.randomInt(100000, 1000000).toString();
    const expires = new Date(new Date().getTime() + 3600 * 1000);

    const tokenExists = await getVerificationTokenByEmail(email);
    if(tokenExists){
        await db.verificationToken.delete({
            where: {
                email: tokenExists.email
            },
        })
    }

    await db.verificationToken.create({
        data:{
            email,
            token,
            expires
        },
    })

    return token;
}

export const generateResetPasswordToken = async (email: string) =>{
    const token = uuidv4();
    const expires = new Date(new Date().getTime() + 3600 * 1000);

    const tokenExists = await getResetPasswordTokenByEmail(email);
    if(tokenExists){
        await db.resetPasswordToken.delete({
            where: {
                email: tokenExists.email
            },
        })
    }

    await db.resetPasswordToken.create({
        data:{
            email,
            token,
            expires
        },
    })

    return token;
}