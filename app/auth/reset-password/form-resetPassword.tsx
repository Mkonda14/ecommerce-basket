"use client"

import * as z from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { resetPasswordSchema } from "@/models";

import Link from "next/link";
import { RxUpdate } from "react-icons/rx"; 

import { Form, FormField, FormItem, FormControl, FormMessage} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Typographie } from "@/components/typographie";

import { FormResponse, FormResponseProps } from "@/components/design-system/form-response";
import { Input } from "@/components/ui/input";
import { resetPassword } from "@/actions/resetPassword";

import { useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import { LoaderSpin } from "@/components/loader-spin";


export const FormResetPassword = () => {

    const [response, setResponse] = useState<FormResponseProps>();
    const [isPending, startTransition] = useTransition();
    const useParams = useSearchParams();

    const token = useParams.get('token') as string;

    const form = useForm<z.infer<typeof resetPasswordSchema>>({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues:{
            password: "",
            confirmPassword: "",
        }
    })

    const onSubmit = (data: z.infer<typeof resetPasswordSchema>) => {
        startTransition(async ()=> {
            const res = await resetPassword(data, token);
            setResponse(res as FormResponseProps);
        })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-3">
                    <FormField
                        control={form.control}
                        name="password"
                        render={({field})=>(
                            <FormItem className="space-y-4">
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
                            <FormItem className="space-y-4">
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
                    By signing in, you agreeng to our <Link href="#" className="font-semibold">Terms of service</Link> and <Link href="#" className="font-semibold">Electronics Communication Policy</Link>
                </Typographie>

                <div className="w-full">
                    <Button disabled={isPending} type="submit" className="w-full p-5 space-x-3 font-semibold text-base"> 
                        <span>Update</span> 
                        {isPending ? <LoaderSpin /> : <RxUpdate />}   
                    </Button>
                </div>
            </form>
        </Form>
    )
}
