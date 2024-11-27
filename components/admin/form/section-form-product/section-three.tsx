
import { z } from "zod";
import { ProductSchema } from "@/models/product";
import { UseFormReturn } from "react-hook-form";

import {v4 as uuidv4} from "uuid";

import { FormControl, FormField, FormItem, FormMessage, FormDescription } from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { SectionForm } from "../section-form";
import { Label } from "../label";
import { ColorPicker } from "@/components/color-picker";
import { AiOutlineClose } from "react-icons/ai";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { IoMdAdd } from "react-icons/io";

interface SectionThreeProps{
    form: UseFormReturn<z.infer<typeof ProductSchema>>;
}

export const SectionThree = ({form}: SectionThreeProps) => {

    const initialColor = form.getValues().colors?.secondary?.map(() => uuidv4()) || [uuidv4()];
    const initialSize = form.getValues().sizes?.map(() => uuidv4()) || [uuidv4()];

    const [nbColor, setNbColor] = useState<string[]>(initialColor);
    const [nbSize, setNbSize] = useState<string[]>(initialSize);


    const addSize = () => {
        setNbSize((previous)=> [...previous, uuidv4()] )
    };
    const deleteSize = (id: string) => {
        if(nbSize){
            setNbSize((previous)=> previous.filter(color => color !== id))
        }
    };


    const addColor = () => {
        setNbColor((previous)=> [...previous, uuidv4()] )
    };
    const deleteColor = (id: string) => {
        if(nbColor.length > 1){
            setNbColor((previous)=> previous.filter(color => color !== id))
        }
    };
    

    return (
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
                                <ColorPicker value={form.getValues().colors.primary.code || "#333"} form={form} nameCode={`colors.primary.code`} nameColor={`colors.primary.name`} />
                            </div>

                            {/* Color secondary */}
                            <div className="">
                                <Label className="block mb-3">Colors secondary</Label>
                                <div className="grid grid-cols-3 mt-2 gap-4">
                                {nbColor.map((id, idx) => (
                                    <div key={id} className="relative transition-all duration-300 full ease-out">
                                        <ColorPicker 
                                            value={form.getValues().colors.secondary?.[idx].code || "#333"}
                                            key={id} 
                                            form={form} 
                                            nameCode={`colors.secondary.${idx}.code`} 
                                            nameColor={`colors.secondary.${idx}.name`} 
                                        />
                                        <Button type="button" className="w-5 h-5 absolute rounded-full -top-2 -right-2" size="icon" variant="destructive" onClick={()=>{
                                            field.onChange({
                                                primary: field.value.primary, 
                                                secondary: field.value.secondary?.filter((_, i) => i !== idx) || []
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

                                <div className="w-full grid grid-cols-3 gap-4">
                                    {nbSize.map((item, idx)=>(
                                    <div key={item} className="relative flex gap-x-1 w-full">
                                        <FormField 
                                            name={`sizes.${idx}.size`}
                                            control={form.control}
                                            render={({field})=>(
                                                <FormItem key={item} className="">
                                                    <FormControl>
                                                        <Input max={99} type="text" className="w-12 h-10 py-5" placeholder="0.0" {...field} />
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
                                                <Input type="text" className="py-5" placeholder="quantity" {...field} />
                                            </FormControl>
                                            </FormItem>
                                        )}
                                        />

                                        <Button type="button" className="w-5 h-5 absolute rounded-full -top-2 -right-2" size="icon" variant="destructive" onClick={()=>{
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
    )
}
