
import { z } from "zod";
import { ProductSchema } from "@/models/product";
import { UseFormReturn } from "react-hook-form";

import { FormControl, FormField, FormItem, FormMessage, FormDescription } from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { SectionForm } from "../section-form";
import { Label } from "../label";
import RichText from "@/components/rich-text";

interface SectionOneProps{
    form: UseFormReturn<z.infer<typeof ProductSchema>>;
}

export const SectionOne = ({form}: SectionOneProps) => {
    return (
        <SectionForm
            title="Name & Description"
            color="emerald"
            isFirst
            backHref="#"
        >
            <FormField
            name="marque"
            control={form.control}
            render={({field})=>(
                <FormItem>
                    <Label type="question"> Product title</Label>
                    <FormControl>
                    <Input
                        placeholder="Name"
                        type="text"
                        {...field}
                        className="py-5"
                    />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
            />

            <FormField
            name="model"
            control={form.control}
            render={({field})=>(
                <FormItem>
                <Label type="question"> Product model</Label>
                <FormControl>
                    <Input
                    placeholder="model"
                    type="text"
                    {...field}
                    className="py-5"
                    />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />

            <FormField
            name="description"
            control={form.control}
            render={({field})=>(
                <FormItem>
                <Label type="question"> Description</Label>
                <FormControl>
                    <RichText 
                    value={field.value}
                    onChange={field.onChange}
                    />
                </FormControl>
                <FormDescription>Description du produit</FormDescription>
                <FormMessage />
                </FormItem>
            )}
            />
        
    </SectionForm>
  )
}
