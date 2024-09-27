"use client"

import {z} from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

import { Form, FormField, FormItem, FormControl } from "@/components/ui/form"
import { FiSearch } from "react-icons/fi"

export const InputSearch = () => {

    const SearchSchema = z.object({
        search: z.string().min(1).transform((input)=> input.trim())
    })

    const form = useForm<z.infer<typeof SearchSchema>>({
        resolver: zodResolver(SearchSchema),
        defaultValues: {
            search: ""
        }
    })

    const onSubmit = (data: z.infer<typeof SearchSchema>) => {
        console.log(data);
    }

    return (
        <div className="p-1 rounded-md bg-slate-100">
                <Form {...form}>
                    <form 
                        action="" 
                        className="flex justify-between items-center gap-x-1 bg-slate-100"
                        onSubmit={form.handleSubmit(onSubmit)}
                    >
                        <FiSearch className="h-5 w-5 text-gray-500" />  
                        <FormField
                            name="search"
                            control={form.control}
                            render={({field})=>(
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            placeholder="Search or type a command"
                                            type="text"
                                            className="border-none bg-transparent outline-none shadow-none focus-visible:ring-0"
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <Button variant={"outline"} className="bg-white text-slate-800 px-2 h-7">⌘ F</Button>
                    </form>
                </Form>

        </div>
    )
}
