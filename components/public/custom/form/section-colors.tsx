import { z } from "zod";
import { CustomizationSchema } from "@/models/customization";
import { UseFormReturn } from "react-hook-form";

import { v4 as uuidv4 } from "uuid";

import {
  FormField,
  FormItem,
  FormMessage,
  FormDescription,
  FormLabel,
} from "@/components/ui/form";
import { ColorPicker } from "@/components/color-picker";
import { AiOutlineClose } from "react-icons/ai";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { useResetForm } from "@/hooks/stores/use-form-store";
import { CustomSchema } from "@/models/custom";

interface SectionThreeProps {
  form: UseFormReturn<z.infer<typeof CustomizationSchema>>;
}

export const SectionColors = ({ form }: SectionThreeProps) => {
  const initialColor: string[] | undefined = form
    .getValues()
    .colors?.map(() => uuidv4());
  const isReset = useResetForm.use.isReset();

  useEffect(() => {
    if (isReset) {
      setNbColor([]);
    }
  }, [isReset]);

  const [nbColor, setNbColor] = useState<string[]>(initialColor || []);

  const addColor = () => {
    setNbColor((previous) => [...previous, uuidv4()]);
  };
  const deleteColor = (id: string) => {
    setNbColor((previous) => previous.filter((color) => color !== id));
  };
  return (
      <div className="w-full">
        <FormField
          name="colors"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <div className="">
                <div className="mb-4">
                  <FormLabel>Custom colors </FormLabel>
                  <FormDescription>
                    Veuillez insérer chaque couleur secondaire
                  </FormDescription>
                </div>

                {/* Color secondary */}
                <div className="">
                  <div className="grid grid-cols-4 mt-2 gap-4">
                    {nbColor.map((id, idx) => (
                      <div
                        key={id}
                        className="relative transition-all duration-300 full ease-out"
                      >
                        <ColorPicker
                          value={
                            form.getValues().colors?.[idx]?.code ||
                            "#333"
                          }
                          form={form as UseFormReturn<z.infer<typeof CustomSchema> | z.infer<typeof CustomizationSchema>>}
                          nameCode={`colors.${idx}.code`}
                          nameColor={`colors.${idx}.name`}
                        />
                        <Button
                          type="button"
                          className="w-5 h-5 absolute rounded-full -top-2 -right-2"
                          size="icon"
                          variant="destructive"
                          onClick={() => {
                            field.onChange(
                              field?.value?.filter((_, i) => i !== idx) || []
                            );
                            deleteColor(id);
                          }}
                        >
                          <AiOutlineClose />
                        </Button>
                      </div>
                    ))}
                  </div>
                  <FormMessage />
                  <div className="flex justify-end mt-4 border-t pt-4">
                    <Button type="button" size="icon" onClick={addColor}>
                      <IoMdAdd />
                    </Button>
                  </div>
                </div>
              </div>
            </FormItem>
          )}
        />
      </div>
  );
};

