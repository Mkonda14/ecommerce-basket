"use client"

import * as z from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { verificationTokenSchema } from "@/models";

import Link from "next/link";
import { BsEnvelopeCheck } from "react-icons/bs"; 

import { Form, FormField, FormItem, FormControl, FormMessage, FormDescription} from "@/components/ui/form";
import { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator } from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import { Typographie } from "@/components/typographie";

import { FormResponse, FormResponseProps } from "@/components/design-system/form-response";
import { useState, useTransition } from "react";
import { verificationToken } from "@/actions/verificationToken";
import { LoaderSpin } from "@/components/loader-spin";


export const FormVerifiedEmail = () => {

    const [response, setResponse] = useState<FormResponseProps>();
    const [isPending, startTransition] = useTransition();


    const form = useForm<z.infer<typeof verificationTokenSchema>>({
        resolver: zodResolver(verificationTokenSchema),
        defaultValues:{
            token: "",
        }
    })

    const onSubmit = (data: z.infer<typeof verificationTokenSchema>) => {
        startTransition(async ()=> {
            const res = await verificationToken(data);
            setResponse(res as FormResponseProps);
        })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-3">
                    <FormField
                        control={form.control}
                        name="token"
                        render={({field})=>(
                            <FormItem className="space-y-4">
                                <FormControl>
                                    <InputOTP
                                        {...field}
                                        maxLength={6}
                                        className=""
                                    >
                                        <InputOTPGroup>
                                            <InputOTPSlot index={0}  className="text-lg w-12 h-10" />
                                            <InputOTPSlot index={1} className="text-lg w-12 h-10" />
                                        </InputOTPGroup>
                                            <InputOTPSeparator />
                                        <InputOTPGroup>
                                            <InputOTPSlot index={2} className="text-lg w-12 h-10" />
                                            <InputOTPSlot index={3} className="text-lg w-12 h-10" />
                                        </InputOTPGroup>
                                            <InputOTPSeparator />
                                        <InputOTPGroup>
                                            <InputOTPSlot index={4} className="text-lg w-12 h-10" />
                                            <InputOTPSlot index={5} className="text-lg w-12 h-10" />
                                        </InputOTPGroup>
                                    </InputOTP>
                                </FormControl>
                                <FormDescription>Veuillez insérer le token que vous avez recu sur votre boite mail</FormDescription>
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
                        <span>Submit</span> 
                        {isPending ? <LoaderSpin /> : <BsEnvelopeCheck /> }
                    </Button>
                </div>
            </form>
        </Form>
    )
}
