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
import { Button } from "@/components/ui/button";
import { ColorPicker } from "@/components/color-picker";

import { useState } from "react";
import {v4 as uuidv4} from "uuid";
import { AiOutlineClose } from "react-icons/ai"; 
import { IoMdAdd } from "react-icons/io"; 


export const FormProduct = () => {
  const form = useForm<z.infer<typeof ProductSchema>>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      name: "",
      model: "",
      themes: [],
      colors: {
        primary: {
          name: "primary",
          code: "#000"
        },
        secondary: [{
          name: "secondary",
          code: "#000"
        }]
      }
    },
  });

  const [nbColor, setNbColor] = useState<string[]>([
    uuidv4()
  ]);

  const addColor = () => {
    setNbColor((previous)=> [...previous, uuidv4()] )
  };

  const deleteColor = (id: string) => {
    setNbColor((previous)=> previous.filter(color => color !== id))
  };

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
                            <span>Product color</span> <BsQuestionCircle />
                          </FormLabel>
                          <FormDescription>Veuillez insérer chaque couleur ainsi que la quantité</FormDescription>
                        </div>

                        <FormLabel>Color primary</FormLabel>
                        <ColorPicker form={form} nameCode={`colors.primary.code`} nameColor={`colors.primary.name`} />

                        <div className="py-2"></div>

                        <div className="border-t py-3">
                          <FormLabel className="pb-4">Colors secondary</FormLabel>
                          <div className="grid grid-cols-4 mt-2 gap-4">
                          {nbColor.map((id, idx) => (
                              <div key={id} className="relative transition-all duration-300 ease-out">
                                <ColorPicker form={form} nameCode={`colors.secondary.${idx}.code`} nameColor={`colors.secondary.${idx}.name`} />
                                <Button className="w-5 h-5 absolute rounded-full -top-2 -right-2" size="icon" variant="destructive" onClick={()=>{
                                  field.onChange({
                                    primary: field.value.primary, 
                                    secondary: [...field.value.secondary.filter(val=> field.value.secondary.indexOf(val) !== idx)]
                                  })
                                  deleteColor(id)
                                }}> <AiOutlineClose /> </Button>
                              </div>
                            ))}
                          </div>
                          <FormMessage />
                          <div className="flex justify-end mt-4 border-t pt-4">
                            <Button type="button" size="icon" onClick={addColor}> <IoMdAdd /> </Button>
                          </div>
                        </div>
                        
                      </FormItem>
                    )}
                  />

              
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
                  render={({})=>(
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
