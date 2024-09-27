import NextAuth from "next-auth";
import {PrismaAdapter} from "@auth/prisma-adapter";
import {db} from "@/lib/db";
import { getUserById } from "./actions/auth";
import { UserRole } from "@prisma/client";
import authConfig from "@/authConfig";


export const {
    handlers: {GET, POST},
    signIn, 
    signOut, 
    auth} = NextAuth({
    adapter: PrismaAdapter(db),
    session: {
        strategy: 'jwt',
        maxAge: 3600 * 24
    },
    events: {
        async linkAccount({user}){
            await db.user.update({
                where:{
                    id: user.id
                },
                data:{
                    emailVerified: new Date()
                }
            })
        },
        async signIn({user}){
            await db.user.update({
                where:{
                    id: user.id
                },
                data:{
                    lastLogin: new Date()
                }
            })
        }
    },
    callbacks: {
        async session({session, token}){
            if(token.sub && session.user){
                session.user.id = token.sub
            }

            if(token.role && session.user){
                session.user.role = token.role as UserRole;
            }
        
            return session;
        },
        async jwt({token}){
            if(!token.sub) return token;
            const user = await getUserById(token.sub);
            if(!user) return token;
            token.role = user.role;
            return token;
        },
        async signIn({user, account}){
            if(account?.provider !== "credentials") return true;
            if(user.id){
                const userExists = await getUserById(user.id);
                if(!userExists || !userExists?.emailVerified)  return false;
            }
            return true;
        }
    },
    pages: {
        signIn: "/auth/sign-in",
        signOut: "/auth/sign-out",
        error: "/auth/error",
        newUser: "/auth/sign-up"
    },
    ...authConfig,
})

