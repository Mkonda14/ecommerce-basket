"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from "@/components/ui/form";

import { Footer } from "@/components/admin/form/footer";

import { saveTag } from "@/actions/category-attribut/save";
import { TagSchema } from "@/models/category-attributs";
import { SectionForm } from "@/components/admin/form/section-form";
import { Label } from "@/components/admin/form/label";
import { Input } from "@/components/ui/input";
import RichText from "@/components/rich-text";


export const FormTag = () => {
  const form = useForm<z.infer<typeof TagSchema>>({
    resolver: zodResolver(TagSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof TagSchema>) => {
    console.log(data)
    await saveTag(data);
  };


  return (
    <main>
      <Form {...form} >
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
          <main className="w-full min-h-[calc(100vh - 100px)] flex gap-x-4 p-4 pt-0">
            <SectionForm
                title="Name & Description"
                color="emerald"
                isFirst
                backHref="#"
            >
                <FormField
                name="name"
                control={form.control}
                render={({field})=>(
                    <FormItem>
                        <Label type="question"> Tag name</Label>
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
                    <FormDescription>Description du tag</FormDescription>
                    <FormMessage />
                    </FormItem>
                )}
                />
            
            </SectionForm>
          </main>
          <Footer onReset={form.reset} />
        </form>
      </Form>
    </main>
  );
};
