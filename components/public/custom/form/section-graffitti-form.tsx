import { z } from "zod";
import { UseFormReturn } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
} from "@/components/ui/form";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

import { useQuery } from "@tanstack/react-query";

import { getGraffitiCards } from "@/actions/public-actions/custom";
import { CustomizationSchema } from "@/models/customization";
import { RadioGraffitti } from "./radio-graffitti";

interface ICustomization {
  form: UseFormReturn<z.infer<typeof CustomizationSchema>>;
}

type TGraffittis = Awaited<ReturnType<typeof getGraffitiCards>>;

export const SectionGraffitti = ({ form }: ICustomization) => {
  const iGraffittis: TGraffittis = [];

  const { data: graffittis } = useQuery<TGraffittis>({
    queryKey: ["graffitis-form", "public"],
    queryFn: () => getGraffitiCards(),
    initialData: iGraffittis,
  });

  return (
    <section className="">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-graffittis">
          <FormField
            name="graffitti"
            control={form.control}
            render={({}) => (
              <FormItem>
                <AccordionTrigger>
                  <FormLabel>La liste des graffittis disponible</FormLabel>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-4 gap-4 p-2">
                    {graffittis.map((graffitti, idx) => (
                      <FormField
                        control={form.control}
                        name="graffitti"
                        key={idx}
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={graffitti.id}
                            >
                              <FormControl>
                                <RadioGraffitti
                                  onChange={field.onChange}
                                  name={field.name}
                                  value={field.value}
                                  data={graffitti}
                                />
                              </FormControl>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                  </div>
                </AccordionContent>
                <FormMessage />
              </FormItem>
            )}
          />
        </AccordionItem>
      </Accordion>
    </section>
  );
};
