import { z } from "zod";
import { CustomSchema } from "@/models/custom";
import { UseFormReturn } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormDescription,
  FormLabel,
} from "@/components/ui/form";
import { SectionForm } from "../section-form";
import { Label } from "../label";
import { Checkbox } from "@/components/ui/checkbox";
import Select2 from 'react-select';

import { useQuery } from "@tanstack/react-query";

import { getThemes } from "@/actions/theme";
import { CategoryCustom, Theme } from "@prisma/client";
import { getCategoryCustoms } from "@/actions/custom/category";

interface SectionFourProps {
  form: UseFormReturn<z.infer<typeof CustomSchema>>;
}

export const SectionFour = ({ form }: SectionFourProps) => {
  const iThemes: Theme[] = [];
  const iCategories: CategoryCustom[] = [];

  const { data: themes } = useQuery<Theme[]>({
    queryKey: ["themes-form"],
    queryFn: () => getThemes(),
    initialData: iThemes,
  });

  const { data: categories } = useQuery<CategoryCustom[]>({
    queryKey: ["categories-form"],
    queryFn: () => getCategoryCustoms(),
    initialData: iCategories,
  });

  return (
    <SectionForm title="Category & attribut" color="violet">
      <FormField
        name="themes"
        control={form.control}
        render={({}) => (
          <FormItem>
            <div className="mb-4">
              <Label type="question"> Thèmes </Label>
              <FormDescription>
                Sélectionnez des thèmes pour votre produit.
              </FormDescription>
            </div>
            <div className="grid grid-cols-3 gap-y-4">
              {themes.map((theme) => (
                <FormField
                  key={theme.id}
                  control={form.control}
                  name="themes"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={theme.id}
                        className="flex flex-row items-start space-x-3 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(theme.id)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange(
                                    field.value
                                      ? [...field.value, theme.id]
                                      : [theme.id]
                                  )
                                : field.onChange(
                                    field.value?.filter(
                                      (value) => value !== theme.id
                                    )
                                  );
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {theme.name}
                        </FormLabel>
                      </FormItem>
                    );
                  }}
                />
              ))}
            </div>
            <FormMessage />
          </FormItem>
        )}
      />

              <FormField
                name="categories"
                control={form.control}
                render={({field})=>(
                <FormItem>
                    <Label type="question"> Categories </Label>
                    <FormControl>
                    <Select2
                        isMulti
                        options={categories.map(category => ({value: category.id, label: category.name}) )} 
                        {...field}
                        placeholder="Categories"
                        className="basic-multi-select"
                        classNamePrefix="select"
                    />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
    </SectionForm>
  );
};
