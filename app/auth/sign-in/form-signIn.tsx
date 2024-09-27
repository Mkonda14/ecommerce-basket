"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"


import { signInSchema } from "@/models";

import Link from "next/link";
import { FaSignInAlt } from "react-icons/fa"; 
import { LoaderSpin } from "@/components/loader-spin";

import { Form, FormField, FormItem, FormControl, FormMessage} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Typographie } from "@/components/typographie";

import { FormResponse, FormResponseProps } from "@/components/design-system/form-response";
import { useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import { signIn } from "@/actions/signIn";

export const FormSignIn = () => {

    const [response, setResponse] = useState<FormResponseProps>();
    const [isPending, startTransition] = useTransition();
    const useParams = useSearchParams();

    const callbackUrl = useParams.get("callbackUrl");

    if(useParams.get("error") === "OAuthAccountNotLinked"){
        setResponse({
            msg: "E-mail déjà utilisé avec differents fournisseurs", 
            type: "error"} as FormResponseProps
        );
    }

    const form = useForm<z.infer<typeof signInSchema>>({
        resolver: zodResolver(signInSchema),
        defaultValues:{
            email: "",
            password: "",
            rememberMe: true
        }
    })

    const onSubmit = (data: z.infer<typeof signInSchema>) => {
        startTransition(async ()=> {
            const res = await signIn(data, callbackUrl)
            setResponse(res as FormResponseProps);
        })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-3">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({field})=>(
                            <FormItem>
                                <FormControl>
                                    <Input 
                                        placeholder="example@example.com"
                                        type="email"
                                        {...field}
                                        className="px-4 py-5"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="space-y-3">
                    <FormField
                        control={form.control}
                        name="password"
                        render={({field})=>(
                            <FormItem>                              
                                <FormControl>
                                    <Input 
                                        placeholder="••••••"
                                        type="password"
                                        {...field}
                                        className="px-4 py-5"
                                    />
                                </FormControl>
                                <div className="flex items-center justify-end">
                                    <Link href="/auth/forgot-password" className="text-sm text-blue-600">Forgot your password?</Link>
                                </div>
                            </FormItem>
                        )}
                    />
                </div>

                <FormResponse {...response} />

                <Typographie component="p" variant="p" size="md" className="text-justify">
                    By signing in, you agreeng to our <Link href="#" className="font-semibold">Terms of service</Link> and <Link href="#" className="font-semibold">Electronics Communication Policy</Link>
                </Typographie>

                <div className="w-full">
                    <Button disabled={isPending} type="submit" className="w-full p-5 space-x-3 font-semibold text-base"> 
                        <span>Sign In</span> 
                        {isPending ? <LoaderSpin /> : <FaSignInAlt />}   
                    </Button>
                </div>
            </form>
        </Form>
    )
}
