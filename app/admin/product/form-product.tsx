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
import { Label } from "@/components/admin/form/label";
import { CardProduct } from "@/components/card-product";


export const FormProduct = () => {
  const form = useForm<z.infer<typeof ProductSchema>>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      marque: "",
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
      },
      sizes: [{
        size: 12,
        quantity: 100
      }]
    },
  });

  const [nbColor, setNbColor] = useState<string[]>([
    uuidv4()
  ]);

  const [nbSize, setNbSize] = useState<string[]>([
    uuidv4()
  ]);

  const addSize = () => {
    setNbSize((previous)=> [...previous, uuidv4()] )
  };
  const deleteSize = (id: string) => {
    setNbSize((previous)=> previous.filter(color => color !== id))
  };

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
              {/* section name, mode, description */}
              <SectionForm
                title="Name & Description"
                color="emerald"
                isFirst
                backHref="#"
              >
                <FormField
                  name="marque"
                  control={form.control}
                  render={({field})=>(
                    <FormItem>
                        <Label type="question"> Product title</Label>
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
                  name="model"
                  control={form.control}
                  render={({field})=>(
                    <FormItem>
                      <Label type="question"> Product model</Label>
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
                      <Label type="question"> Description</Label>
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
                      <Label type="question"> Amount</Label>
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
                            <Label type="question"> Is promotion</Label>
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
                          <Label type="question"> Promo price</Label>
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
                <div className="w-full">
                  <FormField
                    name="stock"
                    control={form.control}
                    render={({field})=>(
                      <FormItem>
                          <Label type="question">Product stock </Label>
                          <FormControl>
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
                </div>

                <div className="w-full">
                  <FormField
                      name="colors"
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <div className="">
                            <div className="mb-4">
                              <Label type="question">Product colo </Label>
                              <FormDescription>Veuillez insérer chaque couleur ainsi que la quantité</FormDescription>
                            </div>

                            {/* Color primary */}
                            <div className="mb-6">
                              <Label className="block mb-3">Color primary</Label>
                              <ColorPicker form={form} nameCode={`colors.primary.code`} nameColor={`colors.primary.name`} />
                            </div>

                            {/* Color secondary */}
                            <div className="">
                              <Label className="block mb-3">Colors secondary</Label>
                              <div className="grid grid-cols-3 mt-2 gap-4">
                              {nbColor.map((id, idx) => (
                                  <div key={id} className="relative transition-all duration-300 full ease-out">
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
                          </div>                          
                        </FormItem>
                      )}
                    />
                </div>


                <div className="w-full">
                  <FormField 
                    name="sizes"
                    control={form.control}
                    render={({field})=>(
                      <FormItem className="-mt-5">
                        <div className="">
                            <div className="">
                                <div className="mb-5">
                                  <Label type="question">Product sizes</Label>
                                  <FormDescription>Veuillez insérer chaque size ainsi que la quantité</FormDescription>
                                </div>

                                <div className="w-full grid grid-cols-3">
                                  {nbSize.map((item, idx)=>(
                                    <div key={item} className="relative flex gap-x-1 w-full">
                                      <FormField 
                                        name={`sizes.${idx}.size`}
                                        control={form.control}
                                        render={({field})=>(
                                          <FormItem className="">
                                            <FormControl>
                                              <Input max={99} className="w-12 h-10 py-5" placeholder="0.0" {...field} />
                                            </FormControl>
                                          </FormItem>
                                        )}
                                      />

                                      <FormField 
                                        name={`sizes.${idx}.quantity`}
                                        control={form.control}
                                        render={({ field})=>(
                                          <FormItem>
                                            <FormControl>
                                              <Input type="number" className="py-5" placeholder="quantity" {...field} />
                                            </FormControl>
                                          </FormItem>
                                        )}
                                      />

                                      <Button className="w-5 h-5 absolute rounded-full -top-2 -right-2" size="icon" variant="destructive" onClick={()=>{
                                        field.onChange([...field.value.filter(val=> field.value.indexOf(val) !== idx)])
                                        deleteSize(item)
                                      }}> <AiOutlineClose /> </Button>
                                    </div>
                                  ))}
                                </div>
                            </div>
                            <FormMessage />
                            <div className="flex justify-end mt-4 border-t pt-4">
                              <Button type="button" size="icon" onClick={addSize}> <IoMdAdd /> </Button>
                            </div>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>

              
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
                        <Label type="question"> Category </Label>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="py-5">
                              <SelectValue placeholder="Select a verified email to display" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="m@example.com">Baskets de mode</SelectItem>
                            <SelectItem value="m@google.com">Baskets de basketball</SelectItem>
                            <SelectItem value="m@sup.com">Baskets de course</SelectItem>
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
                        <Label type="question"> Thèmes </Label>
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
                      <Label type="question"> Tags </Label>
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
                      <Label type="question"> Cover images </Label>
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
            {/* --------------------------- */}
            <section className="w-1/4">
                <CardProduct
                  marque={form.getValues().marque}
                  model={""}
                  description={""}
                  price={""}
                  imgUrl={""}
                />
            </section>
          </main>
          <Footer onReset={form.reset} />
        </form>
      </Form>
    </main>
  );
};
