"use client"

import { z } from "zod";
import { ProductSchema } from "@/models/product";
import { FormControl, FormField, FormItem } from "./ui/form"
import { Input } from "./ui/input";

import { SketchPicker } from 'react-color';
import { useState } from "react";
import { Button } from "./ui/button";
import { UseFormReturn } from "react-hook-form";

interface ColorPickerProps{
    nameCode: string;
    nameColor?: string;
    form: UseFormReturn<z.infer<typeof ProductSchema>>;
}

export const ColorPicker = ({nameCode, nameColor="colors", form}: ColorPickerProps) => {

    const [state, setState] = useState({
        open: false,
        color: "#333",
    });
    
    const handleClick = () => {
        setState((previous) => ({...previous, open: !previous.open}));
    };

    const styles = {
        swatch: "p-1 bg-white w-12 h-10 rounded-sm shadow-sm inline-block cursor-pointer",
        color: `w-full h-full rounded-sm`,
        popover: "absolute z-10",
        cover: "fixed top-0 left-0 right-0 bottom-0",
    }


    return (           
        <div className="flex border gap-x-1">
            <FormField
                name={`${nameCode}`}
                control={form.control}
                render={({ field }) => (
                    <FormItem className="">
                    <FormControl>
                    <div>
                        <Button type="button" variant={"outline"} className={ styles.swatch } onClick={ handleClick }>
                            <div className={styles.color} style={{backgroundColor: state.color}} ></div>
                        </Button>
                        { state.open ? <div className={ styles.popover }>
                        <div className={ styles.cover } onClick={ handleClick }/>
                        <SketchPicker color={ state.color } onChange={(color)=> {
                            field.onChange(color.hex);
                            setState((previous) => ({...previous, color: color.hex}));                                
                        } } />
                        </div> : null }
                    </div>
                    </FormControl>
                    </FormItem>
                )}
            />
            
            <FormField
                name={`${nameColor}`}
                control={form.control}
                render={({ field }) => (
                    <FormItem className="flex-grow">
                    <FormControl>
                        <Input {...field} className="w-full py-5" placeholder="Name color" />
                    </FormControl>
                    </FormItem>
                )}
            />
        </div>
  )
}
