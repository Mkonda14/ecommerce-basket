import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { signInSchema } from "./models";
import bcrypt from "bcryptjs";
import { getUserByEmail } from "./actions/auth";
import { NextAuthConfig } from "next-auth";

const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            allowDangerousEmailAccountLinking: true
        }),
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
            allowDangerousEmailAccountLinking: true
        }),
        CredentialsProvider({
            async authorize (credentials) {
                const valid = signInSchema.safeParse(credentials);
                if (!valid.success) return null;

                const { email, password } = valid.data;
                const user = await getUserByEmail(email);

                if (!user || !user.password) return null;

                const isValidPassword = await bcrypt.compare(password, user.password);
                if (!isValidPassword) return null;

                return user;
            },
        })
    ],
    // Ajoutez d'autres options de configuration ici si nécessaire
} satisfies NextAuthConfig;

export default authOptions;
