"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";

import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from "@/components/ui/form";

import { Footer } from "@/components/admin/form/footer";

import { ThemeSchema } from "@/models/category-attributs";
import { SectionForm } from "@/components/admin/form/section-form";
import { Label } from "@/components/admin/form/label";
import { Input } from "@/components/ui/input";
import RichText from "@/components/rich-text";

import { useTransition } from 'react';
import { ToastSave } from '@/hooks/use-toast-save';
import { updateTheme } from '@/actions/category-attribut/update';
import { CategoryTheme, Theme } from "@prisma/client";
import { saveTheme } from "@/actions/category-attribut/save";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dropzone } from "@/components/dropzone";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getCategoryThemes } from "@/actions/category-attribut";
import { useQuery } from "@tanstack/react-query";


interface FormThemeProps{
  themeId?: string;
  theme?: Theme
}


export const FormTheme = ({themeId, theme}: FormThemeProps) => {

  const [isLoading, startTransition] = useTransition();
  const iCategories: CategoryTheme[] = [];

  const form = useForm<z.infer<typeof ThemeSchema>>({
    resolver: zodResolver(ThemeSchema),
    defaultValues: {
      name: theme?.name || "",
      category: theme?.categoryId || "",
      description: theme?.description || "",
      image: {public_id: "", secure_url: ""}
    },
  });

  const {data: categories} = useQuery<CategoryTheme[]>({
      queryKey: ['categories'],
      queryFn: ()=> getCategoryThemes(),
      initialData: iCategories,
  })

  const onSubmit =  (data: z.infer<typeof ThemeSchema>) => {
    startTransition(async () => {
      const res = themeId ? await updateTheme(themeId, data) : await saveTheme(data);
      if (res.type === "success") form.reset();
      ToastSave(res);
    });
  };


  return (
    <main>
      <Form {...form} >
        <form onSubmit={form.handleSubmit(onSubmit)} className="min-h-[calc(100vh-139px)] w-full flex flex-col justify-between">
          <main className="w-full min-h-[calc(100vh - 100px)] space-y-4 p-4 pt-0">
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
                        <Label type="question"> Theme name</Label>
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
                    <FormDescription>Description du theme</FormDescription>
                    <FormMessage />
                    </FormItem>
                )}
                />

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
                                    <SelectItem key={category.id} value={category.id}>{category.globalName}/{category.name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                    )}
                />
            
            </SectionForm>
            {/* --------------- */}
            <SectionForm
                title="Images & CTA"
                color="cyan"
                >
                <FormField
                    name="image"
                    control={form.control}
                    render={({field})=>(
                    <FormItem>
                        <Label type="question"> Cover images </Label>
                        <FormControl>
                        <Dropzone 
                            onChange={field.onChange}
                            maxFiles={1}
                            folder="theme"
                            className=""
                        />
                        </FormControl>
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
