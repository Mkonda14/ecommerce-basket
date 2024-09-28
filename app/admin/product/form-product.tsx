"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ProductSchema } from "@/models/product";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";


import { SectionForm } from "@/components/admin/form/section-form";
import { Input } from "@/components/ui/input";
import RichText from "@/components/rich-text";
import { Dropzone } from "@/components/dropzone";

export const FormProduct = () => {
  const form = useForm<z.infer<typeof ProductSchema>>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      name: "",
      model: "",
      price: 0,
      pricePromo: 0,
      isPromo: false,
    },
  });

  const onSubmit = (data: z.infer<typeof ProductSchema>) => {
    console.log(data);
  };

  return (
    <main>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Name"
                      type="text"
                      {...field}
                      className="py-6"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="model"
              control={form.control}
              render={({field})=>(
                <FormItem>
                  <FormLabel>Model</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="model"
                      type="text"
                      {...field}
                      className="py-6"
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
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <RichText 
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
           
          </SectionForm>
          {/*  */}
          <SectionForm
            title="Images & CTA"
            color="cyan"
          >
            <FormField
              name="images"
              control={form.control}
              render={({field})=>(
                <FormItem>
                  <FormLabel>Cover images</FormLabel>
                  <FormControl>
                    <Dropzone 
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormDescription>Description du produit</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </SectionForm>
        </form>
      </Form>
    </main>
  );
};
