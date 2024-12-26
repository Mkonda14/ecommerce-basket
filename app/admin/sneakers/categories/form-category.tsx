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
import { useRouter } from "next/navigation";
import { useAction } from "next-safe-action/hooks";
import { useQueryClient } from "@tanstack/react-query";


interface FormCategoryProps{
  categoryId?: string;
  category?: CategorySneaker
}


export const FormCategory = ({category, categoryId}: FormCategoryProps) => {

  const [isLoading, startTransition] = useTransition();
  const router = useRouter();
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof CategorySneakerSchema>>({
      resolver: zodResolver(CategorySneakerSchema),
      defaultValues: {
      name: category?.name || "",
      description: category?.description || "",
      designer: category?.designer || "",
      },
  });

  const { executeAsync: executeSave } = useAction(saveCategorySneaker,{
      onSuccess: ({data}) =>{
        ToastSave({
          type: 'success',
          message: `${data?.message}`
        })
        form.reset();
        router.refresh();
        queryClient.invalidateQueries({queryKey:["category-sneakers"]});
      },
      onError: ({error}) =>{
        ToastSave({
          type: 'error',
          message: `${error.serverError?.serverError}`
        })
      }
    }
  )
  const { executeAsync: executeUpdated } = useAction(updateCategorySneaker,{
      onSuccess: ({data}) =>{
        ToastSave({
          type: 'success',
          message: `${data?.message}`
        })
        queryClient.invalidateQueries({queryKey:["category-sneakers"]});
        router.push("/admin/category-sneakers")
      },
      onError: ({error}) =>{
        ToastSave({
          type: 'error',
          message: `${error.serverError?.serverError}`
        })
      }
    }
  )

  const onSubmit = (data: z.infer<typeof CategorySneakerSchema>) => {
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
