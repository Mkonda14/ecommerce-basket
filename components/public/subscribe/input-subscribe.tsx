"use client"

import {z} from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Form, FormField, FormItem, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { BsSend } from "react-icons/bs"; 

export const InputSubscribe = () => {

    const EmailSchama = z.object({
        email: z.string().email(),
    })

    const form = useForm<z.infer<typeof EmailSchama>>({
        resolver: zodResolver(EmailSchama),
        defaultValues:{
            email: ""
        }
    })

    const onSubmit = (data: z.infer<typeof EmailSchama>) => {
        console.log(data);
    };

    return (
        <Form {...form}>
            <form 
                action="" 
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex justify-center items-center"
            >
                <div className="flex justify-between items-center border">
                    <span className="p-2"><BsSend className="w-5 h-5" /></span>

                    <FormField
                        name="email"
                        control={form.control}
                        render={({field})=>(
                            <FormItem>
                                <FormControl>
                                    <Input
                                        placeholder="example@example.com"
                                        type="email"
                                        className="w-[400px] border-none bg-transparent outline-none shadow-none focus-visible:ring-0"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                
                <Button size={"lg"} variant={"default"} className="">
                    Subscribe
                </Button>
            </form>
        </Form>
    )
}
