import * as z from 'zod';

export const signInSchema = z.object({
    email: z.string().email({
        message: "L'adresse email est invalide"
    }),
    password: z.string(),
    rememberMe: z.boolean().optional().default(true)
})

export const signUpSchema = z.object({
    firstname: z.string().min(1, "Firstname required"),
    lastname: z.string().min(1, "Lastname required"),
    email: z.string().email(),
    password: z.string().min(6, "Minimum des caracteres 6"),
    confirmPassword: z.string()
}).refine((values)=> values.password === values.confirmPassword, {
    message: "Les mots de passe doit être identiques",
    path: ["confirmPassword"]
})

export const forgotPasswordSchema = z.object({
    email: z.string().email()
})

export const resetPasswordSchema = z.object({
    password: z.string().min(6, "minimum des caractères est 6").max(16, "maximum des caractères est 16"),
    confirmPassword: z.string()
}).refine((values)=> values.password === values.confirmPassword, {
    message: "Les mots de passe doit être identiques",
    path: ["confirmPassword"]
})

export const verificationTokenSchema = z.object({
    token: z.string().min(6, "Minimum des caractères requis est 6").max(6, "Maximum des caractères requis est 6")
})