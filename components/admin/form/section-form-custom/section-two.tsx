import { z } from "zod";
import { CustomSchema } from "@/models/custom";
import { UseFormReturn } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SectionForm } from "../section-form";
import { Label } from "../label";

interface SectionTwoProps {
  form: UseFormReturn<z.infer<typeof CustomSchema>>;
}

export const SectionTwo = ({ form }: SectionTwoProps) => {
  return (
    <SectionForm title="Price & if is custom" color="violet">
      <FormField
        name="price"
        control={form.control}
        render={({ field }) => (
          <FormItem className="">
            <Label type="question">Price</Label>
            <FormControl>
              <Input type="number" {...field} className="py-5" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </SectionForm>
  );
};
