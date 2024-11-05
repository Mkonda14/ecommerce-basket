"use client"

import {z} from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

import { Form, FormField, FormItem, FormControl } from "@/components/ui/form"
import { FiSearch } from "react-icons/fi"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useQuery } from "@tanstack/react-query"
import { CategorySneaker } from "@prisma/client"
import { getCategorySneakers } from "@/actions/category-attribut"

export const InputSearch = () => {

    const SearchSchema = z.object({
        search: z.string().min(1).transform((input)=> input.trim()),
        category: z.string()
    })

    const iCategories: CategorySneaker[] = [];

    const form = useForm<z.infer<typeof SearchSchema>>({
        resolver: zodResolver(SearchSchema),
        defaultValues: {
            search: "",
            category: "all",
        }
    })

    const {data: categories} = useQuery<CategorySneaker[]>({
        queryKey: ['category-sneakers'],
        queryFn: ()=> getCategorySneakers(),
        initialData: iCategories,
    })

    const onSubmit = (data: z.infer<typeof SearchSchema>) => {
        console.log(data);
    }

    return (
        <div className="">
                <Form {...form}>
                    <form 
                        action="" 
                        className="flex justify-between items-center border"
                        onSubmit={form.handleSubmit(onSubmit)}
                    >
                        <FormField
                            name="category"
                            control={form.control}
                            render={({field})=>(
                            <FormItem className={""}>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger className="rounded-none border-none border-r">
                                            <SelectValue placeholder="All categories" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value={"all"}>{"All categories"}</SelectItem>
                                        {categories.map(category =>(
                                            <SelectItem key={category.id} value={category.id}>{category.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </FormItem>
                            )}
                        />

                        <FormField
                            name="search"
                            control={form.control}
                            render={({field})=>(
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            placeholder="chercher votre sneaker à travers son model"
                                            type="text"
                                            className="w-[500px] border-none bg-transparent outline-none shadow-none focus-visible:ring-0"
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        <Button size={"icon"} className="">
                            <FiSearch className="h-5 w-5" />   
                        </Button>
                    </form>
                </Form>

        </div>
    )
}
