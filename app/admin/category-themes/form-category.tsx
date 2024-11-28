"use client";

import { z } from "zod";

import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from "@/components/ui/form";

import { Footer } from "@/components/admin/form/footer";

import { CategoryThemeSchema } from "@/models/category-attributs";
import { SectionForm } from "@/components/admin/form/section-form";
import { Label } from "@/components/admin/form/label";
import { Input } from "@/components/ui/input";
import RichText from "@/components/rich-text";

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';


import { useTransition } from 'react';
import { ToastSave } from '@/hooks/use-toast-save';
import { updateCategoryTheme } from '@/actions/category-attribut/update';
import { CategoryTheme } from "@prisma/client";
import { saveCategoryTheme } from "@/actions/category-attribut/save";
import { useRouter } from "next/navigation";
import { useAction } from "next-safe-action/hooks";
import { useQueryClient } from "@tanstack/react-query";


interface FormCategoryProps{
  categoryId?: string;
  category?: CategoryTheme
}


export const FormCategory = ({category, categoryId}: FormCategoryProps) => {

  const [isLoading, startTransition] = useTransition();
  const router = useRouter();
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof CategoryThemeSchema>>({
      resolver: zodResolver(CategoryThemeSchema),
      defaultValues: {
      name: category?.name || "",
      description: category?.description || "",
      globalName: category?.globalName || "",
      },
  });

  const { executeAsync: executeSave } = useAction(saveCategoryTheme,{
      onSuccess: ({data}) =>{
        ToastSave({
          type: 'success',
          message: `${data?.message}`
        })
        form.reset();
        router.refresh();
        queryClient.invalidateQueries({queryKey:["category-themes"]});
      },
      onError: ({error}) =>{
        ToastSave({
          type: 'error',
          message: `${error.serverError?.serverError}`
        })
      }
    }
  )
  const { executeAsync: executeUpdated } = useAction(updateCategoryTheme,{
      onSuccess: ({data}) =>{
        ToastSave({
          type: 'success',
          message: `${data?.message}`
        })
        queryClient.invalidateQueries({queryKey:["category-themes"]});
        router.push("/admin/category-themes")
      },
      onError: ({error}) =>{
        ToastSave({
          type: 'error',
          message: `${error.serverError?.serverError}`
        })
      }
    }
  )

  const onSubmit = (data: z.infer<typeof CategoryThemeSchema>) => {
    startTransition(async ()=> {
      categoryId ? await executeUpdated({categoryId, data}) : await executeSave(data);
    })
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
                name="globalName"
                control={form.control}
                render={({field})=>(
                    <FormItem>
                        <Label type="question"> Global name </Label>
                        <FormControl>
                        <Input
                            placeholder="Second name"
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
          <Footer 
            onReset={form.reset} 
            name={categoryId ? "Updated category" : "Save category"} 
            loading={isLoading} 
          />
        </form>
      </Form>
    </main>
  );
};
