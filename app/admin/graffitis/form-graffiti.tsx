"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";

import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from "@/components/ui/form";

import { Footer } from "@/components/admin/form/footer";

import { SectionForm } from "@/components/admin/form/section-form";
import { Label } from "@/components/admin/form/label";
import { Input } from "@/components/ui/input";
import RichText from "@/components/rich-text";

import { useTransition } from 'react';
import { ToastSave } from '@/hooks/use-toast-save';
import { CategoryGraffiti, Graffiti } from "@prisma/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dropzone } from "@/components/dropzone";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useAction } from "next-safe-action/hooks";
import { getCategoryGraffitis } from "@/actions/graffiti/category";
import { GraffitiSchema } from "@/models/graffiti";
import { saveGraffiti } from "@/actions/graffiti/save";
import { updateGraffiti } from "@/actions/graffiti/update";
import { FragmentFormDefaultColors } from "@/components/admin/form/section-form-graffiti/fragment-form-graffiti";
import { useResetForm } from "@/hooks/stores/use-form-store";

type Concat = {
    defaultColors: {color: string, name: string}[] | undefined,
}

interface FormThemeProps{
    graffitiId?: string;
    graffiti?: Graffiti & Concat
}


export const FormGraffiti = ({graffitiId, graffiti}: FormThemeProps) => {

  const [isLoading, startTransition] = useTransition();
  const router = useRouter();
  const queryClient = useQueryClient();
  const onChangeReset = useResetForm.use.onChange();

  const iCategories: CategoryGraffiti[] = [];

  const form = useForm<z.infer<typeof GraffitiSchema>>({
    resolver: zodResolver(GraffitiSchema),
    defaultValues: {
      name: graffiti?.name || "",
      category: graffiti?.categoryId || "",
      description: graffiti?.description || "",
      textMaxLength: graffiti?.textMaxLength?.toString() || "1",
      textMinLength: graffiti?.textMinLength?.toString() || "1",
      textMaxWords: graffiti?.textMaxWords?.toString() || "1",
      defaultColors: graffiti?.defaultColors?.map(clr => ({code: clr.color, name: clr.name})) || [{
        name: "black",
        code: "#000"
      }],
      image: {public_id: "", secure_url: ""}
    },
  });

  const {data: categories} = useQuery<CategoryGraffiti[]>({
      queryKey: ['categories'],
      queryFn: ()=> getCategoryGraffitis(),
      initialData: iCategories,
  })

  const { executeAsync: executeSave } = useAction(saveGraffiti,{
      onSuccess: ({data}) =>{
        ToastSave({
          type: 'success',
          message: `${data?.message}`
        })
        form.reset();
        onChangeReset(true);
        queryClient.invalidateQueries({queryKey:["graffitis"]});
      },
      onError: ({error}) =>{
        ToastSave({
          type: 'error',
          message: `${error.serverError?.serverError}`
        })
      }
    }
  )
  const { executeAsync: executeUpdated } = useAction(updateGraffiti,{
      onSuccess: ({data}) =>{
        ToastSave({
          type: 'success',
          message: `${data?.message}`
        })
        queryClient.invalidateQueries({queryKey:["graffitis"]});
        router.push("/admin/graffitis")
      },
      onError: ({error}) =>{
        ToastSave({
          type: 'error',
          message: `${error.serverError?.serverError}`
        })
      }
    }
  )

  const onSubmit = (data: z.infer<typeof GraffitiSchema>) => {
    startTransition(async ()=> {
        graffitiId ? await executeUpdated({graffitiId, data}) : await executeSave(data);
    })
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
                        <Label type="question"> Graffiti name</Label>
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
                    <FormDescription>Description du graffiti</FormDescription>
                    <FormMessage />
                    </FormItem>
                )}
                />
            
            </SectionForm>
            {/* --------------- */}
            <SectionForm
                title="Length, Default colors & Catégorie"
                color="emerald"
            >
                <div className="flex gap-x-4">
                    <FormField
                        name="textMinLength"
                        control={form.control}
                        render={({field})=>(
                            <FormItem className="w-1/3">
                                <Label type="question"> Char min</Label>
                                <FormControl>
                                <Input
                                    placeholder="1"
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
                        name="textMaxLength"
                        control={form.control}
                        render={({field})=>(
                            <FormItem className="w-1/3">
                                <Label type="question"> Char max</Label>
                                <FormControl>
                                <Input
                                    placeholder="1"
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
                        name="textMaxWords"
                        control={form.control}
                        render={({field})=>(
                            <FormItem className="w-1/3">
                                <Label type="question"> Words max</Label>
                                <FormControl>
                                <Input
                                    placeholder="1"
                                    type="text"
                                    {...field}
                                    className="py-5"
                                />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                </div>

                <FragmentFormDefaultColors form={form} />

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
                                    <SelectItem key={category.id} value={category.id}>{category.secondName}/{category.name}</SelectItem>
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
                            folder="graffiti"
                            className=""
                        />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
            </SectionForm>

          </main>
          <Footer 
            onReset={form.reset} 
            name={graffitiId ? "Updated graffiti" : "Save graffiti"} 
            loading={isLoading} 
          />
        </form>
      </Form>
    </main>
  );
};
