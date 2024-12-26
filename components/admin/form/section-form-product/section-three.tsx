import { z } from "zod";
import { ProductSchema } from "@/models/product";
import { UseFormReturn } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { IoMdAdd } from "react-icons/io";

import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SectionForm } from "../section-form";
import { Label } from "../label";
import { Button } from "@/components/ui/button";
import { useResetForm } from "@/hooks/stores/use-form-store";
import { ColorName } from "@/components/color-name";

interface SectionThreeProps {
  form: UseFormReturn<z.infer<typeof ProductSchema>>;
}

const INITIAL_COLOR_PRIMARY = uuidv4();
const INITIAL_SIZE = uuidv4();

export const SectionThree = ({ form }: SectionThreeProps) => {
  const initialColorPrimaries: string[] = form
    .getValues()
    .colorPrimaries?.map(() => uuidv4()) || [INITIAL_COLOR_PRIMARY];

  const initialSize: string[][] = form
    .getValues()
    .colorPrimaries?.map((colorPrimary) =>
      colorPrimary.sizes.map(() => uuidv4())
    ) || [[INITIAL_SIZE]];

  const isReset = useResetForm.use.isReset();

  useEffect(() => {
    if (isReset) {
      setNbColorPrimaries([]);
      setNbSize([]);
    }
  }, [isReset]);

  const [nbColorPrimaries, setNbColorPrimaries] = useState<string[]>(
    initialColorPrimaries || []
  );

  const [nbSize, setNbSize] = useState<string[][]>(initialSize);

  const addSize = (idx: number) => {
    setNbSize((prev) => {
      const newSize = [...prev];
      if (newSize[idx]) {
        newSize[idx] = [...newSize[idx], uuidv4()];
      } else {
        newSize[idx] = [uuidv4()];
      }
      return newSize;
    });
  };

  const deleteSize = (idx: number, id: string) => {
    setNbSize((prev) => {
      const newSize = [...prev];
      if (newSize[idx]) {
        newSize[idx] = newSize[idx].filter((size) => size !== id);
      }
      return newSize;
    });
  };

  const addColorPrimary = () => {
    setNbColorPrimaries((prev) => [...prev, uuidv4()]);
    setNbSize((prev) => [...prev, [uuidv4()]]);
  };

  const deleteColorPrimary = (id: string) => {
    setNbColorPrimaries((prev) => prev.filter((color) => color !== id));
    setNbSize((prev) => prev.filter((_, index) => nbColorPrimaries[index] !== id));
  };

  return (
    <SectionForm title="Stock, colors & sizes" color="emerald">
      <div className="w-full">
        <FormField
          name="stock"
          control={form.control}
          render={({ field }) => (
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
          name="colorPrimaries"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <div className="">
                <div className="mb-4">
                  <Label type="question">Color primary & sizes </Label>
                  <FormDescription>
                    Veuillez insérer chaque couleur primary ainsi les sizes et quantités de sneaker
                  </FormDescription>
                </div>
                {/* Color primaries */}
                {nbColorPrimaries.map((colorPrimary, idx) => (
                  <section className="border p-4 relative mb-4" key={colorPrimary}>
                    <Button
                      type="button"
                      className="w-8 h-8 absolute rounded-sm -top-2 -right-2"
                      size="icon"
                      variant="destructive"
                      onClick={() => {
                        field.onChange(
                          field.value?.filter((_, i) => i !== idx) || []
                        );
                        deleteColorPrimary(colorPrimary);
                      }}
                    >
                      <AiOutlineClose />
                    </Button>

                    {/* Color primary */}
                    <div className="mb-6">
                      <Label className="block mb-3">Color primary</Label>
                      <ColorName
                        value={
                          form.getValues().colorPrimaries[idx]?.code || "#333"
                        }
                        form={form}
                        nameCode={`colorPrimaries.${idx}.code`}
                        nameColor={`colorPrimaries.${idx}.name`}
                      />
                    </div>

                    {/* Sizes */}
                    <div className="w-full">
                      <FormField
                        name={`colorPrimaries.${idx}.sizes`}
                        control={form.control}
                        render={({ field }) => (
                          <FormItem className="-mt-5">
                            <div className="">
                              <div className="">
                                <div className="mb-5">
                                  <Label type="question">Product sizes</Label>
                                  <FormDescription>
                                    Veuillez insérer chaque size ainsi que la
                                    quantité
                                  </FormDescription>
                                </div>

                                <div className="w-full grid grid-cols-4 gap-4">
                                  {nbSize[idx]?.map((item, idx2) => (
                                    <div
                                      key={item}
                                      className="relative flex gap-x-1 w-full"
                                    >
                                      <FormField
                                        name={`colorPrimaries.${idx}.sizes.${idx2}.size`}
                                        control={form.control}
                                        render={({ field }) => (
                                          <FormItem key={item} className="">
                                            <FormControl>
                                              <Input
                                                max={99}
                                                type="text"
                                                className="w-12 h-10 py-5"
                                                placeholder="0.0"
                                                {...field}
                                              />
                                            </FormControl>
                                          </FormItem>
                                        )}
                                      />

                                      <FormField
                                        name={`colorPrimaries.${idx}.sizes.${idx2}.quantity`}
                                        control={form.control}
                                        render={({ field }) => (
                                          <FormItem className="flex-1">
                                            <FormControl>
                                              <Input
                                                type="text"
                                                className="py-5"
                                                placeholder="quantity"
                                                {...field}
                                              />
                                            </FormControl>
                                          </FormItem>
                                        )}
                                      />

                                      <Button
                                        type="button"
                                        className="w-6 h-6 absolute rounded-sm -top-2 -right-2"
                                        size="icon"
                                        variant="destructive"
                                        onClick={() => {
                                            const sizes : {size: string, quantity: string}[] = field.value || form.getValues().colorPrimaries[idx].sizes;
                                            field.onChange([ ...sizes.filter((val) => sizes.indexOf(val) !== idx2), ]); 
                                            deleteSize(idx, item);
                                        }}
                                      >
                                        <AiOutlineClose />
                                      </Button>
                                    </div>
                                  ))}
                                </div>
                              </div>
                              <FormMessage />
                              <div className="flex justify-end mt-4 border-t pt-4">
                                <Button
                                  type="button"
                                  onClick={() => addSize(idx)}
                                >
                                  <IoMdAdd /> <span>Size</span>
                                </Button>
                              </div>
                            </div>
                          </FormItem>
                        )}
                      />
                    </div>
                  </section>
                ))}
                <div className="flex justify-end mt-4">
                  <Button type="button" onClick={addColorPrimary}>
                    <IoMdAdd /> <span>Color primary</span>
                  </Button>
                </div>
              </div>
            </FormItem>
          )}
        />
      </div>
    </SectionForm>
  );
};
