
import { z } from "zod";
import { ProductSchema } from "@/models/product";
import { UseFormReturn } from "react-hook-form";


import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { SectionForm } from "../section-form";
import { Label } from "../label";

import { Dropzone } from "@/components/dropzone";

interface SectionFiveProps{
    form: UseFormReturn<z.infer<typeof ProductSchema>>;
}

export const SectionFive = ({form}: SectionFiveProps) => {
    return (
        <SectionForm
            title="Images & CTA"
            color="cyan"
            >
            <FormField
                name="images"
                control={form.control}
                render={({field})=>(
                <FormItem>
                    <Label type="question"> Cover images </Label>
                    <FormControl>
                    <Dropzone 
                        onChange={field.onChange}
                        className=""
                    />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
        </SectionForm>
    )
}
