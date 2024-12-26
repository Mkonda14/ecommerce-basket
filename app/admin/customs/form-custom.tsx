"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { CustomSchema } from "@/models/custom";

import { Form } from "@/components/ui/form";

import { SectionOne } from "@/components/admin/form/section-form-custom/section-one";
import { SectionTwo } from "@/components/admin/form/section-form-custom/section-two";
import { SectionThree } from "@/components/admin/form/section-form-custom/section-three";
import { SectionFour } from "@/components/admin/form/section-form-custom/section-four";
import { SectionFive } from "@/components/admin/form/section-form-custom/section-five";

import { Footer } from "@/components/admin/form/footer";

import { saveCustom } from "@/actions/custom/save";
import { updateCustom } from "@/actions/custom/update";

import { useTransition } from "react";
import { ToastSave } from "@/hooks/use-toast-save";
import { Custom as TCustom } from "@prisma/client";
import { zodResolver } from "@hookform/resolvers/zod";

import { useRouter } from "next/navigation";
import { useAction } from "next-safe-action/hooks";
import { useQueryClient } from "@tanstack/react-query";
import { useResetForm } from "@/hooks/stores/use-form-store";
import { SectionSneaker } from "@/components/admin/form/section-form-custom/section-sneaker";

type Custom = {
  themes: { id: string }[];
  colorSecondaries: { color: string; name: string }[];
  colorPrimaryId: string | null;
};

interface FormCustomProps {
  customId?: string;
  custom?: TCustom & Custom;
}

export const FormCustom = ({ customId, custom }: FormCustomProps) => {
  const [isLoading, startTransition] = useTransition();
  const router = useRouter();
  const queryClient = useQueryClient();
  const onChangeReset = useResetForm.use.onChange();

  const form = useForm<z.infer<typeof CustomSchema>>({
    resolver: zodResolver(CustomSchema),
    defaultValues: {
      name: custom?.name || "",
      description: custom?.description || "",
      price: `${custom?.price || "0.0"}`,
      themes: custom?.themes.map((theme) => theme.id) || [],
      colorPrimary: custom?.colorPrimaryId || "",
      colorSecondaries: custom?.colorSecondaries.map((clr) => ({
        code: clr.color,
        name: clr.name,
      })) || [
        {
          name: "black",
          code: "#222",
        },
      ],

      images: [
        {
          public_id: "custom/mhpcchmackb8wjphvth2",
          secure_url:
            "https://res.cloudinary.com/dlqnx8srw/image/upload/v1728696317/custom/mhpcchmackb8wjphvth2.jpg",
        },
      ],
    },
  });

  const { executeAsync: executeSave } = useAction(saveCustom, {
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
  const { executeAsync: executeUpdated } = useAction(updateCustom, {
    onSuccess: ({ data }) => {
      ToastSave({
        type: "success",
        message: `${data?.message}`,
      });
      queryClient.invalidateQueries({ queryKey: ["customs"] });
      router.push("/admin/customs");
    },
    onError: ({ error }) => {
      ToastSave({
        type: "error",
        message: `${error.serverError?.serverError}`,
      });
    },
  });

  const onSubmit = (data: z.infer<typeof CustomSchema>) => {
    startTransition(async () => {
      customId
        ? await executeUpdated({ customId, data })
        : await executeSave(data);
    });
  };

  return (
    <main>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          id="myForm"
          className="min-h-[calc(100vh-139px)] flex flex-col justify-between w-full"
        >
          <main className="w-full flex gap-x-4 p-4 pt-0">
            <section className="w-full space-y-4">
              {/* Section pour la selection des couleur des sneaker */}
              <SectionSneaker form={form} />
              {/* section name, mode, description */}
              <SectionOne form={form} />

              {/* Section price */}
              <SectionTwo form={form} />

              {/* Stock, colors, sizes */}
              <SectionThree form={form} />

              {/* Categorie & tag */}
              <SectionFour form={form} />

              {/* Section image */}
              <SectionFive form={form} />
            </section>
          </main>
          <Footer
            onReset={form.reset}
            name={customId ? "Updated sneaker" : "Save sneaker"}
            loading={isLoading}
          />
        </form>
      </Form>
    </main>
  );
};
