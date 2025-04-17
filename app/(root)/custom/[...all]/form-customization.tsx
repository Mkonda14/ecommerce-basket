"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { CustomizationSchema } from "@/models/customization";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Footer } from "@/components/public/custom/form/footer";

import { useTransition } from "react";
import { ToastSave } from "@/hooks/use-toast-save";
import { zodResolver } from "@hookform/resolvers/zod";

import { useAction } from "next-safe-action/hooks";
import { useQueryClient } from "@tanstack/react-query";
import { useResetForm } from "@/hooks/stores/use-form-store";
import { saveCustomization } from "@/actions/public-actions/custom/save";
import { SectionGraffitti } from "@/components/public/custom/form/section-graffitti-form";
import { Container } from "@/components/container";
import { Input } from "@/components/ui/input";
import { SectionColors } from "@/components/public/custom/form/section-colors";
import RichText from "@/components/rich-text";
import { Condition } from "@/components/public/custom/customization/condition";

interface IFormCustomization {
  sneaker: string;
}

export const FormCustomization = ({ sneaker }: IFormCustomization) => {
  const [isLoading, startTransition] = useTransition();
  const queryClient = useQueryClient();
  const onChangeReset = useResetForm.use.onChange();

  const form = useForm<z.infer<typeof CustomizationSchema>>({
    resolver: zodResolver(CustomizationSchema),
    defaultValues: {
      text: "",
      instruction: "",
      description: "",
      graffitti: "",
      colors: [{ name: "black", code: "#222" }],
    },
  });

  const { executeAsync: executeSave } = useAction(saveCustomization, {
    onSuccess: ({ data }) => {
      ToastSave({
        type: "success",
        message: `${data?.message}`,
      });
      form.reset();
      onChangeReset(true);
      queryClient.invalidateQueries({ queryKey: ["customs"] });
    },
    onError: ({ error }) => {
      ToastSave({
        type: "error",
        message: `${error.serverError?.serverError}`,
      });
    },
  });

  const onSubmit = (data: z.infer<typeof CustomizationSchema>) => {
    startTransition(async () => {
      await executeSave({ custom: data, sneaker });
    });
  };

  return (
    <Container className="flex gap-x-8" maxWidth>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          id="myForm"
          className="flex flex-col gap-y-8 w-3/4"
        >
          <main className="w-full flex flex-col gap-y-8">
            {/* Section pour la selection des graffitti */}
            <SectionGraffitti form={form} />

            <FormField
              name="text"
              control={form.control}
              render={({ field }) => {
                return (
                  <FormItem className="">
                    <FormLabel>Text</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Exemple Text"
                        className="p-5"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Inserer le text du graffitti
                    </FormDescription>
                  </FormItem>
                );
              }}
            />

            <SectionColors form={form} />

            <FormField
              name="instruction"
              control={form.control}
              render={({ field }) => {
                return (
                  <FormItem className="">
                    <FormLabel>Instructions a respect</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Exemple Text"
                        className="p-5"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Inserer les instruction ou règle a recpect coute que coute
                    </FormDescription>
                  </FormItem>
                );
              }}
            />
            <FormField
              name="description"
              control={form.control}
              render={({ field }) => {
                return (
                  <FormItem className="">
                    <FormLabel>Description du custom</FormLabel>
                    <FormControl>
                      <RichText onChange={field.onChange} value={field.value} />
                    </FormControl>
                    <FormDescription>
                      Inserer les instruction ou règle a recpect coute que coute
                    </FormDescription>
                  </FormItem>
                );
              }}
            />
          </main>
          <Footer
            onReset={form.reset}
            name={"Command custom graffiti"}
            loading={isLoading}
          />
        </form>
      </Form>
      
      <Condition />
    </Container>
  );
};
