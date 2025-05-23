"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";

import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from "@/components/ui/form";

import { Footer } from "@/components/admin/form/footer";

import { TagSneakerSchema } from "@/models/category-attributs";
import { SectionForm } from "@/components/admin/form/section-form";
import { Label } from "@/components/admin/form/label";
import { Input } from "@/components/ui/input";
import RichText from "@/components/rich-text";

import { useTransition } from 'react';
import { ToastSave } from '@/hooks/use-toast-save';
import { updateTagSneaker } from '@/actions/product/tag/update';
import { TagSneaker } from "@prisma/client";
import { saveTagSneaker } from "@/actions/product/tag/save";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useAction } from "next-safe-action/hooks";
import { useQueryClient } from "@tanstack/react-query";


interface FormTagProps{
  tagId?: string;
  tag?: TagSneaker
}


export const FormTag = ({tagId, tag}: FormTagProps) => {

  const [isLoading, startTransition] = useTransition();
  const router = useRouter();
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof TagSneakerSchema>>({
      resolver: zodResolver(TagSneakerSchema),
      defaultValues: {
      name: tag?.name || "",
      description: tag?.description || "",
      },
  });

  const { executeAsync: executeSave } = useAction(saveTagSneaker,{
      onSuccess: ({data}) =>{
        ToastSave({
          type: 'success',
          message: `${data?.message}`
        })
        form.reset();
        router.refresh();
        queryClient.invalidateQueries({queryKey:["tag-sneakers"]});
      },
      onError: ({error}) =>{
        ToastSave({
          type: 'error',
          message: `${error.serverError?.serverError}`
        })
      }
    }
  )
  const { executeAsync: executeUpdated } = useAction(updateTagSneaker,{
      onSuccess: ({data}) =>{
        ToastSave({
          type: 'success',
          message: `${data?.message}`
        })
        queryClient.invalidateQueries({queryKey:["tag-sneakers"]});
        router.push("/admin/tag-sneakers")
      },
      onError: ({error}) =>{
        ToastSave({
          type: 'error',
          message: `${error.serverError?.serverError}`
        })
      }
    }
  )

  const onSubmit = (data: z.infer<typeof TagSneakerSchema>) => {
    startTransition(async ()=> {
      tagId ? await executeUpdated({tagId, data}) : await executeSave(data);
    })
  };

  return (
    <main>
      <Form {...form} >
        <form onSubmit={form.handleSubmit(onSubmit)} className="min-h-[calc(100vh-139px)] flex flex-col justify-between w-full">
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
          <Footer 
            onReset={form.reset} 
            name={tagId ? "Updated tag" : "Save tag"} 
            loading={isLoading} 
          />
        </form>
      </Form>
    </main>
  );
};
