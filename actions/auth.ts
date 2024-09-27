"use server"

import { auth } from "@/auth"
import { db } from "@/lib/db"


export const getUserByEmail = async (email: string) => {
    return await db.user.findFirst({
        where: {
            email,
        },
    })
}

export const getUserById = async (id: string) => {
    return await db.user.findUnique({
        where: {
            id,
        },
    })
}

export const getVerificationTokenByEmail = async (email: string) => {
    return await db.verificationToken.findFirst({
        where: {
            email,
        },
    })
}
export const getVerificationTokenByToken = async (token: string) => {
    return await db.verificationToken.findFirst({
        where: {
            token,
        },
    })
}

export const getResetPasswordTokenByEmail = async (email: string) => {
    return await db.resetPasswordToken.findFirst({
        where: {
            email,
        },
    })
}
export const getResetPasswordTokenByToken = async (token: string) => {
    return await db.resetPasswordToken.findFirst({
        where: {
            token,
        },
    })
}

export const currentUser = async () => {
    const curent = await auth();
    return curent?.user;
}