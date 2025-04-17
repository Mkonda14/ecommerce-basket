"use client";

import { z } from "zod";
import { CustomSchema } from "@/models/custom";
import { CustomizationSchema } from "@/models/customization";
import { FormControl, FormField, FormItem } from "./ui/form";
import { Input } from "@/components/ui/input";

import { SketchPicker, ColorResult } from "react-color";
import { useState } from "react";
import { Button } from "./ui/button";
import { UseFormReturn } from "react-hook-form";

import { AiOutlineBgColors } from "react-icons/ai";

interface ColorPickerProps {
  nameCode: "colorSecondaries" | "colors" | `colorSecondaries.${number}.code` | `colors.${number}.code`;
  nameColor?: "colorSecondaries" | "colors" | `colorSecondaries.${number}.name` | `colors.${number}.name`;
  form: UseFormReturn<z.infer<typeof CustomSchema> | z.infer<typeof CustomizationSchema>>;
  key?: string;
  value?: string;
}

export const ColorPicker = ({
  nameCode,
  nameColor = "colorSecondaries",
  form,
  key,
  value = "#333",
}: ColorPickerProps) => {
  const [state, setState] = useState({
    open: false,
    color: value,
  });

  const handleClick = () => {
    setState((previous) => ({ ...previous, open: !previous.open }));
  };

  const styles = {
    swatch: "w-12 h-10 flex justify-center items-center",
    popover: "absolute z-10",
    cover: "fixed top-0 left-0 right-0 bottom-0",
  };

  return (
    <div className="flex gap-x-1">
      <FormField
        name={nameCode}
        control={form.control}
        render={({ field }) => (
          <FormItem key={key}>
            <FormControl>
              <div>
                <Button
                  type="button"
                  style={{ backgroundColor: state.color }}
                  className={styles.swatch}
                  onClick={handleClick}
                >
                  <AiOutlineBgColors className="w-5 h-5" />
                </Button>
                {state.open && (
                  <div className={styles.popover}>
                    <div className={styles.cover} onClick={handleClick} />
                    <SketchPicker
                      color={state.color}
                      onChange={(color: ColorResult) => {
                        field.onChange(color.hex);
                        setState((previous) => ({
                          ...previous,
                          color: color.hex,
                        }));
                      }}
                    />
                  </div>
                )}
              </div>
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        name={nameColor}
        control={form.control}
        render={({ field }) => (
          <FormItem key={key} className="flex-grow">
            <Input
              type="text"
              className="w-full py-5"
              placeholder="Name color"
              {...field}
              value={typeof field.value === 'string' ? field.value : ''}
            />
          </FormItem>
        )}
      />
    </div>
  );
};
