
import { z } from "zod";
import { ProductSchema } from "@/models/product";
import { UseFormReturn } from "react-hook-form";


import { FormControl, FormField, FormItem, FormMessage, FormDescription, FormLabel } from "@/components/ui/form"
import { SectionForm } from "../section-form";
import { Label } from "../label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import Select2 from 'react-select';

import { Options, ItemThemes } from "./data-test";

interface SectionFourProps{
    form: UseFormReturn<z.infer<typeof ProductSchema>>;
}

export const SectionFour = ({form}: SectionFourProps) => {
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
                            <SelectValue placeholder="Select a verified email to display" />
                        </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                        <SelectItem value="m@example.com">Baskets de mode</SelectItem>
                        <SelectItem value="m@google.com">Baskets de basketball</SelectItem>
                        <SelectItem value="m@sup.com">Baskets de course</SelectItem>
                        <SelectItem value="m@support.com">Baskets de sport spècifique</SelectItem>
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
                    {ItemThemes.map((item) => (
                    <FormField
                        key={item.id}
                        control={form.control}
                        name="themes"
                        render={({ field }) => {
                        return (
                            <FormItem
                                key={item.id}
                                className="flex flex-row items-start space-x-3 space-y-0"
                            >
                            <FormControl>
                                <Checkbox
                                checked={field.value?.includes(item.id)}
                                onCheckedChange={(checked) => {
                                    return checked
                                    ? field.onChange([...field.value, item.id])
                                    : field.onChange(
                                        field.value?.filter(
                                            (value) => value !== item.id
                                        )
                                        )
                                }}
                                />
                            </FormControl>
                            <FormLabel className="font-normal">
                                {item.label}
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
                        options={Options} 
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
