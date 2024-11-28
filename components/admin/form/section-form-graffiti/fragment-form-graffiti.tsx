
import { z } from "zod";
import { UseFormReturn } from "react-hook-form";

import {v4 as uuidv4} from "uuid";

import { FormField, FormItem, FormMessage, FormDescription } from "@/components/ui/form"
import { Label } from "../label";
import { ColorPicker } from "@/components/admin/form/section-form-graffiti/color-picker";
import { AiOutlineClose } from "react-icons/ai";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { useResetForm } from "@/hooks/stores/use-form-store";
import { GraffitiSchema } from "@/models/graffiti";

interface SectionThreeProps{
    form: UseFormReturn<z.infer<typeof GraffitiSchema>>;
}

export const FragmentFormDefaultColors = ({form}: SectionThreeProps) => {

    const initialColor = form.getValues().defaultColors?.map(() => uuidv4()) || [uuidv4()];
    const isReset = useResetForm.use.isReset();

    useEffect(()=>{
        if(isReset){
            setNbColor([]);
        }
    }, [isReset]);

    const [nbColor, setNbColor] = useState<string[]>(initialColor);

    const addColor = () => {
        setNbColor((previous)=> [...previous, uuidv4()] )
    };
    const deleteColor = (id: string) => {
        if(nbColor.length > 1){
            setNbColor((previous)=> previous.filter(color => color !== id))
        }
    };
    

    return (
        <div className="w-full">
            <FormField
                name="defaultColors"
                control={form.control}
                render={({ field }) => (
                <FormItem>
                    <div className="">
                        <div className="mb-4">
                            <Label type="question">Couleurs par default</Label>
                            <FormDescription>Veuillez insérer les couleurs par default</FormDescription>
                        </div>

                        {/* Color secondary */}
                        <div className="">
                            <div className="grid grid-cols-4 mt-2 gap-4">
                                {nbColor.map((id, idx) => (
                                    <div key={id} className="relative transition-all duration-300 full ease-out">
                                        <ColorPicker 
                                            value={form.getValues().defaultColors?.[idx]?.code || "#333"}
                                            key={id} 
                                            form={form} 
                                            nameCode={`defaultColors.${idx}.code`} 
                                            nameColor={`defaultColors.${idx}.name`} 
                                        />
                                        <Button type="button" className="w-5 h-5 absolute rounded-full -top-2 -right-2" size="icon" variant="destructive" onClick={()=>{
                                            field.onChange(
                                                field.value?.filter((_, i) => i !== idx) || []
                                            )
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

    )
}
