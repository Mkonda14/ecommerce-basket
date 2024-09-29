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

import { BsQuestionCircle } from "react-icons/bs"; 
import { Switch } from "@/components/ui/switch";

export const FormProduct = () => {
  const form = useForm<z.infer<typeof ProductSchema>>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      name: "",
      model: "",
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
                    <FormLabel className={"flex items-center gap-x-2 text-base"}> <span>Product title</span> <BsQuestionCircle /> </FormLabel><FormControl>
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
              name="model"
              control={form.control}
              render={({field})=>(
                <FormItem>
                  <FormLabel className={"flex items-center gap-x-2 text-base"}> <span>Product model</span> <BsQuestionCircle /> </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="model"
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
                  <FormLabel className={"flex items-center gap-x-2 text-base"}> <span>Description</span> <BsQuestionCircle /> </FormLabel>
                  <FormControl>
                    <RichText 
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
          {/* Section price */}
          <SectionForm
            title="Images & CTA"
            color="cyan"
          >
            <FormField
              name="price"
              control={form.control}
              render={({field})=>(
                <FormItem>
                  <FormLabel className={"flex items-center gap-x-2 text-base"}> <span>Amount</span> <BsQuestionCircle /> </FormLabel>
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
                control={form.control}
                name="isPromo"
                render={({ field }) => (
                  <FormItem className="flex flex-row justify-between">
                    <div className="space-y-0.5">
                      <FormLabel className={"flex items-center gap-x-2 text-base"}> <span>Is promotion</span> <BsQuestionCircle /> </FormLabel>
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

              <FormField
                name="promoPrice"
                control={form.control}
                render={({field})=>(
                  <FormItem>
                    <FormLabel className={"flex items-center gap-x-2 text-base"}> <span>Promo price</span> <BsQuestionCircle /> </FormLabel>
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

          </SectionForm>
          {/* Section image */}
          <SectionForm
            title="Images & CTA"
            color="cyan"
          >
            <FormField
              name="images"
              control={form.control}
              render={({field})=>(
                <FormItem>
                  <FormLabel className={"flex items-center gap-x-2 text-base"}> <span>Cover images</span> <BsQuestionCircle /> </FormLabel>
                  <FormControl>
                    <Dropzone 
                      onChange={field.onChange}
                      className=""
                    />
                  </FormControl>
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
