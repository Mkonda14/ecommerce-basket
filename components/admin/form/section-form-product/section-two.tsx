
import { z } from "zod";
import { ProductSchema } from "@/models/product";
import { UseFormReturn } from "react-hook-form";

import { FormControl, FormField, FormItem, FormMessage, FormDescription } from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { SectionForm } from "../section-form";
import { Label } from "../label";
import { Switch } from "@/components/ui/switch";

interface SectionTwoProps{
    form: UseFormReturn<z.infer<typeof ProductSchema>>;
}

export const SectionTwo = ({form}: SectionTwoProps) => {
    return (
        <SectionForm
            title="Price & promotion"
            color="violet"
            >

                <div className="flex gap-x-4">
                    <FormField
                        name="price"
                        control={form.control}
                        render={({field})=>(
                        <FormItem className="w-1/2">
                            <Label type="question"> Amount</Label>
                            <FormControl>
                            <Input
                                type="number"
                                {...field}
                                className="py-5"
                            />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />

                    <FormField
                        name="promoPrice"
                        control={form.control}
                        render={({field})=>(
                        <FormItem className="w-1/2">
                            <Label type="question"> Promo price</Label>
                            <FormControl>
                            <Input
                                {...field}
                                type="number"
                                placeholder="0.00"
                                className="py-5"
                            />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                </div>

                <div className="border-t border-slate-200 space-y-4 pt-4">
                    <FormField
                        control={form.control}
                        name="isPromo"
                        render={({ field }) => (
                        <FormItem className="flex flex-row justify-between">
                            <div className="space-y-0.5">
                            <Label type="question"> Is promotion</Label>
                            <FormDescription>
                                Receive emails about new products, features, and more.
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
