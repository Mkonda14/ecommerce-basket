
import { z } from "zod";
import { ProductSchema } from "@/models/product";
import { UseFormReturn } from "react-hook-form";


import { FormControl, FormDescription, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { SectionForm } from "../section-form";
import { Label } from "../label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Select2 from 'react-select';

import { useQuery } from "@tanstack/react-query";

import { getCategorySneakers } from "@/actions/product/category";
import { getTagSneakers } from "@/actions/product/tag";
import { CategorySneaker, TagSneaker } from "@prisma/client";
import { Switch } from "@/components/ui/switch";

interface SectionFourProps{
    form: UseFormReturn<z.infer<typeof ProductSchema>>;
}

export const SectionFour = ({form}: SectionFourProps) => {

    const iCategories: CategorySneaker[] = [];
    const iTags: TagSneaker[] = [];

    const {data: categories} = useQuery<CategorySneaker[]>({
        queryKey: ['categories'],
        queryFn: ()=> getCategorySneakers(),
        initialData: iCategories,
    })

    const {data: tags} = useQuery<TagSneaker[]>({
        queryKey: ['tags'],
        queryFn: ()=> getTagSneakers(),
        initialData: iTags,
    })

    return (
        <SectionForm
            title="Category & attribut"
            color="violet"
            >
            <FormField
                name="category"
                control={form.control}
                render={({field})=>(
                <FormItem>
                    <Label type="question"> Category </Label>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                        <SelectTrigger className="py-5">
                            <SelectValue placeholder="Select a verified category to display" />
                        </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            {categories.map(category =>(
                                <SelectItem key={category.id} value={category.id}>{category.name}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <FormMessage />
                </FormItem>
                )}
            />


            <FormField
                name="tags"
                control={form.control}
                render={({field})=>(
                <FormItem>
                    <Label type="question"> Tags </Label>
                    <FormControl>
                    <Select2
                        isMulti
                        options={tags.map(tag => ({value: tag.id, label: tag.name}) )} 
                        {...field}
                        placeholder="tags"
                        className="basic-multi-select"
                        classNamePrefix="select"
                    />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />

            <div className="border-t border-slate-200 space-y-4 pt-4">
                <FormField
                    control={form.control}
                    name="isCustomByGraffiti"
                    render={({ field }) => (
                        <FormItem className="flex flex-row justify-between">
                            <div className="space-y-0.5">
                                <Label type="question"> Is customizable by graffiti</Label>
                                <FormDescription>
                                    Receive emails about new customs, features, and more.
                                </FormDescription>
                            </div>
                            <FormControl>
                                <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
            </div>
            
        </SectionForm>
    )
}
