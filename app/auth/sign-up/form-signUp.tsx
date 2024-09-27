"use client"

import * as z from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signUpSchema } from "@/models";

import Link from "next/link";
import { FaSignInAlt } from "react-icons/fa"; 

import { Form, FormField, FormItem, FormControl, FormMessage} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Typographie } from "@/components/typographie";

import { FormResponse, FormResponseProps } from "@/components/design-system/form-response";
import { useState, useTransition } from "react";
import { signUp } from "@/actions/signUp";
import { redirect } from "next/navigation";
import { LoaderSpin } from "@/components/loader-spin";

export function FormSignUp(){

    const [response, setResponse] = useState<FormResponseProps>();
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof signUpSchema>>({
        resolver: zodResolver(signUpSchema),
        defaultValues:{
            firstname: "",
            lastname: "",
            email: "",
            password: "",
            confirmPassword: ""
        }
    })

    const onSubmit = (data: z.infer<typeof signUpSchema>) => {
        console.log(data);
        
        startTransition(async ()=> {
            const res = await signUp(data);

            setResponse(res as FormResponseProps);
            if(res.type === 'success') {
                redirect('/auth/verified-email');
            };

        });
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="flex items-center justify-start gap-x-4">
                        <FormField
                            control={form.control}
                            name="firstname"
                            render={({field})=>(
                                <FormItem>
                                    <FormControl>
                                        <Input 
                                            placeholder="First Name"
                                            type="text"
                                            {...field}
                                            className="px-4 py-5"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="lastname"
                            render={({field})=>(
                                <FormItem>
                                    <FormControl>
                                        <Input 
                                            placeholder="Last Name"
                                            type="text"
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
                        name="email"
                        render={({field})=>(
                            <FormItem>
                                <FormControl>
                                    <Input 
                                        placeholder="example@gmail.com"
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
                                        placeholder="password"
                                        type="password"
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
                        name="confirmPassword"
                        render={({field})=>(
                            <FormItem>
                                <FormControl>
                                    <Input 
                                        placeholder="Confirm password"
                                        type="password"
                                        {...field}
                                        className="px-4 py-5"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormResponse {...response} />

                <Typographie component="p" variant="p" size="md" className="text-justify">
                    By creating an account, you agreeng to our <Link href="#" className="font-semibold">Privacy Policy</Link> and <Link href="#" className="font-semibold">Electronics Communication Policy</Link>
                </Typographie>

                <div className="w-full">
                    <Button disabled={isPending} type="submit" className="w-full p-5 space-x-3 font-semibold text-base"> 
                        <span>Sign Up</span> 
                        {isPending ? <LoaderSpin /> : <FaSignInAlt /> }
                    </Button>
                </div>
            </form>
        </Form>
    )
}
