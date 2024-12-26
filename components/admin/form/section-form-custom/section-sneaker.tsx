import { z } from "zod";
import { CustomSchema } from "@/models/custom";
import { UseFormReturn } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";
import { SectionForm } from "../section-form";

import { useQuery } from "@tanstack/react-query";

import { getSneakerSelectForm } from "@/actions/product/select";
import { Typographie } from "@/components/typographie";
import { Separator } from "@/components/ui/separator";
import { RadioColor } from "../radio-color";

interface SectionSneakerProps {
  form: UseFormReturn<z.infer<typeof CustomSchema>>;
}

type TSneaker = {
  marque: string;
  model: string;
  colorPrimaries: {
    name: string;
    id: string;
    color: string;
    quantity: number;
  }[];
};

export const SectionSneaker = ({ form }: SectionSneakerProps) => {
  const iSneakers: TSneaker[] = [];

  const { data: sneakers } = useQuery<TSneaker[]>({
    queryKey: ["sneakers-form"],
    queryFn: () => getSneakerSelectForm(),
    initialData: iSneakers,
  });

  return (
    <SectionForm
      title="The sneaker & color primary"
      color="emerald"
      isFirst
      backHref="#"
      description="Sélectionnez des couleurs primary pour votre custom."
    >
      <FormField
        name="colorPrimary"
        control={form.control}
        render={({}) => (
          <FormItem>
            <div className="grid grid-cols-3 gap-y-4">
              {sneakers.map((sneaker, idx) => (
                <div key={idx} className="border rounded-sm p-3 pt-2">
                  <Typographie component="h3" variant="h3" size="md">
                    {sneaker.marque}
                  </Typographie>
                  <Typographie
                    component="p"
                    variant="p"
                    size="md"
                    className="text-muted-foreground"
                  >
                    {sneaker.model}
                  </Typographie>

                  <Separator className="my-3" />

                  <div className="flex gap-x-4">
                    {sneaker.colorPrimaries?.map((colorPrimary) => (
                      <FormField
                        control={form.control}
                        name="colorPrimary"
                        key={colorPrimary.id}
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={colorPrimary.id}
                              className="flex flex-col items-center"
                            >
                              <FormControl>
                                <RadioColor
                                  onChange={field.onChange}
                                  name={field.name}
                                  code={colorPrimary.color}
                                  value={field.value}
                                  id={colorPrimary.id}
                                  isEmpty={colorPrimary.quantity === 0}
                                />
                              </FormControl>
                              <FormLabel>{colorPrimary.name}</FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
    </SectionForm>
  );
};
