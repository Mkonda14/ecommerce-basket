
import { z } from "zod";
import { ProductSchema } from "@/models/product";
import { UseFormReturn } from "react-hook-form";


import { FormControl, FormField, FormItem, FormMessage, FormDescription, FormLabel } from "@/components/ui/form"
import { SectionForm } from "../section-form";
import { Label } from "../label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import Select2 from 'react-select';

import { useQuery } from "@tanstack/react-query";

import { getCategorySneakers, getTagSneakers, getThemes } from "@/actions/category-attribut";
import { CategorySneaker, TagSneaker, Theme } from "@prisma/client";

interface SectionFourProps{
    form: UseFormReturn<z.infer<typeof ProductSchema>>;
}

export const SectionFour = ({form}: SectionFourProps) => {

    const iCategories: CategorySneaker[] = [];
    const iThemes: Theme[] = [];
    const iTags: TagSneaker[] = [];

    const {data: categories} = useQuery<CategorySneaker[]>({
        queryKey: ['categories'],
        queryFn: ()=> getCategorySneakers(),
        initialData: iCategories,
    })
   
    const {data: themes} = useQuery<Theme[]>({
        queryKey: ['themes'],
        queryFn: ()=> getThemes(),
        initialData: iThemes,
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
                name="themes"
                control={form.control}
                render={({})=>(
                <FormItem>
                    <div className="mb-4">
                    <Label type="question"> Thèmes </Label>
                    <FormDescription>Sélectionnez des thèmes pour votre produit.</FormDescription>
                    </div>
                    <div className="grid grid-cols-3 gap-y-4">
                    {themes.map((theme) => (
                    <FormField
                        key={theme.id}
                        control={form.control}
                        name="themes"
                        render={({ field }) => {
                        return (
                            <FormItem
                                key={theme.id}
                                className="flex flex-row items-start space-x-3 space-y-0"
                            >
                            <FormControl>
                                <Checkbox
                                checked={field.value?.includes(theme.id)}
                                onCheckedChange={(checked) => {
                                    return checked
                                    ? field.onChange([...field.value, theme.id])
                                    : field.onChange(
                                        field.value?.filter(
                                            (value) => value !== theme.id
                                        )
                                        )
                                }}
                                />
                            </FormControl>
                            <FormLabel className="font-normal">
                                {theme.name}
                            </FormLabel>
                            </FormItem>
                        )
                        }}
                    />
                    ))}
                    </div>
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
            
        </SectionForm>
    )
}
