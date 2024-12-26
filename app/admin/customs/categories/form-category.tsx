"use client";

import { z } from "zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Footer } from "@/components/admin/form/footer";
import { SectionForm } from "@/components/admin/form/section-form";
import { Label } from "@/components/admin/form/label";
import { Input } from "@/components/ui/input";
import RichText from "@/components/rich-text";
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useTransition } from 'react';
import { ToastSave } from '@/hooks/use-toast-save';
import { CategoryCustom } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useAction } from "next-safe-action/hooks";
import { useQueryClient } from "@tanstack/react-query";
import { saveCategoryCustom } from "@/actions/custom/category/save";
import { updateCategoryCustom } from "@/actions/custom/category/update";
import { CategoryCustomSchema } from "@/models/custom";

interface FormCategoryProps {
  categoryId?: string;
  category?: CategoryCustom;
}

export const FormCategory = ({ category, categoryId }: FormCategoryProps) => {
  const [isLoading, startTransition] = useTransition();
  const router = useRouter();
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof CategoryCustomSchema>>({
    resolver: zodResolver(CategoryCustomSchema),
    defaultValues: {
      name: category?.name || "",
      description: category?.description || "",
      maintenance: category?.maintenance || "",
      properties: category?.properties || "",
      materials: category?.materials || "",
      creationTime: category?.creationTime || new Date(),
    },
  });

  const { executeAsync: executeSave } = useAction(saveCategoryCustom, {
    onSuccess: ({ data }) => {
      ToastSave({
        type: 'success',
        message: `${data?.message}`
      });
      form.reset();
      router.refresh();
      queryClient.invalidateQueries({ queryKey: ["category-customs"] });
    },
    onError: ({ error }) => {
      ToastSave({
        type: 'error',
        message: `${error.serverError?.serverError}`
      });
    }
  });

  const { executeAsync: executeUpdated } = useAction(updateCategoryCustom, {
    onSuccess: ({ data }) => {
      ToastSave({
        type: 'success',
        message: `${data?.message}`
      });
      queryClient.invalidateQueries({ queryKey: ["category-customs"] });
      router.push("/admin/category-customs");
    },
    onError: ({ error }) => {
      ToastSave({
        type: 'error',
        message: `${error.serverError?.serverError}`
      });
    }
  });

  const onSubmit = (data: z.infer<typeof CategoryCustomSchema>) => {
    startTransition(async () => {
      categoryId ? await executeUpdated({ categoryId, data }) : await executeSave(data);
    });
  };

  return (
    <main>
      <Form {...form}>
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
                render={({ field }) => (
                  <FormItem>
                    <Label type="question">Category name</Label>
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
                render={({ field }) => (
                  <FormItem>
                    <Label type="question">Description</Label>
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

              <FormField
                name="maintenance"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <Label type="question">Maintenance</Label>
                    <FormControl>
                      <Input
                        placeholder="Maintenance"
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
                name="properties"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <Label type="question">Properties</Label>
                    <FormControl>
                      <Input
                        placeholder="Properties"
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
                name="materials"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <Label type="question">Materials</Label>
                    <FormControl>
                      <Input
                        placeholder="Materials"
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
                name="creationTime"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <Label type="question">Creation Time</Label>
                    <Input
                      placeholder="Creation Time"
                      type="date"
                      {...field}
                      className="py-5"
                      value={field.value?.toISOString().split('T')[0]} // Convert Date to string and remove time part
                    />
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
