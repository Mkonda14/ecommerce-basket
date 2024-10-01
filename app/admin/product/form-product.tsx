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
import { Footer } from "@/components/admin/footer";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import Select2 from 'react-select';

import { Options, ItemThemes } from "./data-test";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { Button } from "@/components/ui/button";


export const FormProduct = () => {
  const form = useForm<z.infer<typeof ProductSchema>>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      name: "",
      model: "",
      themes: [],
      colors: Array(1).fill({ quantity: "", color: "" }),
    },
  });

  const [qcolor, setQcolor] = useState(1);

  const onSubmit = (data: z.infer<typeof ProductSchema>) => {
    console.log(data);
  };


  return (
    <main>
      <Form {...form} >
        <form onSubmit={form.handleSubmit(onSubmit)} id="myForm" className="min-h-screen w-full">
          <main className="w-full flex gap-x-4 p-4 pt-0">
            <section className="w-3/4 space-y-4">
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
                title="Price & promotion"
                color="violet"
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

                <div className="border-t border-slate-200 space-y-4 pt-4">
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
                              {...field}
                              type="number"
                              placeholder="0.00"
                              className="py-5"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                </div>

              </SectionForm>

              {/* Stock, colors, sizes */}
              <SectionForm
                title="Stock, colors & sizes"
                color="emerald"
              >
                <FormField
                  name="stock"
                  control={form.control}
                  render={({field})=>(
                    <FormItem>
                        <FormLabel className={"flex items-center gap-x-2 text-base"}> <span>Product stock</span> <BsQuestionCircle /> </FormLabel><FormControl>
                        <Input
                          placeholder="0.0"
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
                    name="colors"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <div className="mb-4">
                          <FormLabel className="flex items-center gap-x-2 text-base">
                            <span>Product color and quantite</span> <BsQuestionCircle />
                          </FormLabel>
                          <FormDescription>Veuillez insérer chaque couleur ainsi que la quantité</FormDescription>
                        </div>
                        <div className="space-y-4">
                          {Array.from({length: qcolor},(_, idx) => (
                            <div key={idx} className="mb-2 flex gap-x-4">
                              <FormField
                                name={`colors.${idx}.color`}
                                control={form.control}
                                render={({ field }) => (
                                  <FormItem className="w-1/4">
                                    <FormLabel>Couleur</FormLabel>
                                    <FormControl>
                                      <Input {...field} type="color" placeholder="Couleur" />
                                    </FormControl>
                                  </FormItem>
                                )}
                              />

                              <FormField
                                name={`colors.${idx}.quantity`}
                                control={form.control}
                                render={({ field }) => (
                                  <FormItem className="w-3/4">
                                    <FormLabel>Quantite</FormLabel>
                                    <FormControl>
                                      <Input {...field} className="w-full" placeholder="Quantité" />
                                    </FormControl>
                                  </FormItem>
                                )}
                              />
                            </div>
                          ))}
                          
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                    <Button type="button" onClick={()=>{
                      setQcolor((q)=> q + 1);
                    }} >ADD</Button>
              
              </SectionForm>

              {/* Categorie & tag */}
              <SectionForm
                title="Category & attribut"
                color="violet"
              >
                <FormField
                  name="category"
                  control={form.control}
                  render={({field})=>(
                    <FormItem>
                        <FormLabel className={"flex items-center gap-x-2 text-base"}> <span>Category</span> <BsQuestionCircle /> </FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="py-5">
                              <SelectValue placeholder="Select a verified email to display" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="m@example.com">Baskets de mode</SelectItem>
                            <SelectItem value="m@google.com">Baskets de basketball</SelectItem>
                            <SelectItem value="m@support.com">Baskets de course</SelectItem>
                            <SelectItem value="m@support.com">Baskets de sport spècifique</SelectItem>
                          </SelectContent>
                        </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  name="themes"
                  control={form.control}
                  render={({field})=>(
                    <FormItem>
                      <div className="mb-4">
                        <FormLabel className={"flex items-center gap-x-2 text-base"}> <span>Themes</span> <BsQuestionCircle /> </FormLabel>
                        <FormDescription>Sélectionnez des thèmes pour votre produit.</FormDescription>
                      </div>
                      <div className="grid grid-cols-3 gap-y-4">
                      {ItemThemes.map((item) => (
                        <FormField
                          key={item.id}
                          control={form.control}
                          name="themes"
                          render={({ field }) => {
                            return (
                              <FormItem
                                key={item.id}
                                className="flex flex-row items-start space-x-3 space-y-0"
                              >
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(item.id)}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([...field.value, item.id])
                                        : field.onChange(
                                            field.value?.filter(
                                              (value) => value !== item.id
                                            )
                                          )
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  {item.label}
                                </FormLabel>
                              </FormItem>
                            )
                          }}
                        />
                      ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  name="tags"
                  control={form.control}
                  render={({field})=>(
                    <FormItem>
                      <FormLabel className={"flex items-center gap-x-2 text-base"}> <span>Tags</span> <BsQuestionCircle /> </FormLabel>
                      <FormControl>
                        <Select2
                          isMulti
                          options={Options} 
                          {...field}
                          placeholder="tags"
                          className="basic-multi-select"
                          classNamePrefix="select"
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
            </section>
            <section className="w-1/4"></section>
          </main>
          <Footer onReset={form.reset} />
        </form>
      </Form>
    </main>
  );
};
