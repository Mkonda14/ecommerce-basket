"use client"

import * as z from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { forgotPasswordSchema } from "@/models";

import Link from "next/link";
import { RxEnvelopeClosed } from "react-icons/rx"; 

import { Form, FormField, FormItem, FormControl, FormMessage, FormDescription} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Typographie } from "@/components/typographie";

import { FormResponse, FormResponseProps } from "@/components/design-system/form-response";
import { useState, useTransition } from "react";
import { Input } from "@/components/ui/input";
import { forgotPassword } from "@/actions/forgotPassword";
import { LoaderSpin } from "@/components/loader-spin";


export const FormForgotPassword = () => {

    const [response, setResponse] = useState<FormResponseProps>();
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof forgotPasswordSchema>>({
        resolver: zodResolver(forgotPasswordSchema),
        defaultValues:{
            email: "",
        }
    })

    const onSubmit = (data: z.infer<typeof forgotPasswordSchema>) => {
        startTransition(async ()=> {
            const res = await forgotPassword(data);
            setResponse(res as FormResponseProps);
        })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-3">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({field})=>(
                            <FormItem className="space-y-4">
                                <FormControl>
                                    <Input
                                        placeholder="example@gmail.com"
                                        type="email"
                                        {...field}
                                        className="px-4 py-5"
                                    />
                                </FormControl>
                                <FormDescription>Veuillez insérer votre email pour le lien pour pouvoir change le password</FormDescription>
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
                        <span>Send mail</span> 
                        {isPending ? <LoaderSpin /> :<RxEnvelopeClosed />}
                    </Button>
                </div>
            </form>
        </Form>
    )
}
