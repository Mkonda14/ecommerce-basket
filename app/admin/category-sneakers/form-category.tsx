"use client";

import { z } from "zod";

import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from "@/components/ui/form";

import { Footer } from "@/components/admin/form/footer";

import { CategorySneakerSchema } from "@/models/category-attributs";
import { SectionForm } from "@/components/admin/form/section-form";
import { Label } from "@/components/admin/form/label";
import { Input } from "@/components/ui/input";
import RichText from "@/components/rich-text";

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';


import { useTransition } from 'react';
import { ToastSave } from '@/hooks/use-toast-save';
import { updateCategorySneaker } from '@/actions/category-attribut/update';
import { CategorySneaker } from "@prisma/client";
import { saveCategorySneaker } from "@/actions/category-attribut/save";


interface FormCategoryProps{
  categoryId?: string;
  category?: CategorySneaker
}


export const FormCategory = ({category, categoryId}: FormCategoryProps) => {

  const [isLoading, startTransition] = useTransition();

  const form = useForm<z.infer<typeof CategorySneakerSchema>>({
      resolver: zodResolver(CategorySneakerSchema),
      defaultValues: {
      name: category?.name || "",
      description: category?.description || "",
      designer: category?.designer || "",
      },
  });

  const onSubmit = (data: z.infer<typeof CategorySneakerSchema>) => {
      startTransition(async () => {
      const res = categoryId ? await updateCategorySneaker(categoryId, data) : await saveCategorySneaker(data);
      if (res.type === "success") form.reset();
      ToastSave(res)
      });
  };

  return (
    <main>
      <Form {...form} >
        <form onSubmit={form.handleSubmit(onSubmit)} className="min-h-[calc(100vh-139px)] flex flex-col justify-between w-full">
          <main className="w-full flex gap-x-4 p-4 pt-0">
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
                        <Label type="question"> Category name</Label>
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
                name="designer"
                control={form.control}
                render={({field})=>(
                    <FormItem>
                        <Label type="question"> Designations </Label>
                        <FormControl>
                        <Input
                            placeholder="Designer"
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
                    <FormDescription>Description du category</FormDescription>
                    <FormMessage />
                    </FormItem>
                )}
                />
            
            </SectionForm>
          </main>
          <Footer onReset={form.reset} loading={isLoading} />
        </form>
      </Form>
    </main>
  );
};
