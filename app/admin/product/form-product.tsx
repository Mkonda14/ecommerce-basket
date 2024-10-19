"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ProductSchema } from "@/models/product";

import { Form } from "@/components/ui/form";

import { SectionOne } from "@/components/admin/form/section-form-product/section-one";
import { SectionTwo } from "@/components/admin/form/section-form-product/section-two";
import { SectionThree } from "@/components/admin/form/section-form-product/section-three";
import { SectionFour } from "@/components/admin/form/section-form-product/section-four";
import { SectionFive } from "@/components/admin/form/section-form-product/section-five";

import { Footer } from "@/components/admin/form/footer";
import { CardPreviewProduct } from "@/components/admin/card-preview-product";

import { saveProduct } from "@/actions/product/saveProduct";

import { useTransition } from "react";
import { ToastSave } from "@/hooks/use-toast-save";


export const FormProduct = () => {

  const [isLoading, startTransition] = useTransition();

  const form = useForm<z.infer<typeof ProductSchema>>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      marque: "",
      model: "",
      themes: [],
      colors: {
        primary: {
          name: "primary",
          code: "#000"
        },
        secondary: [{
          name: "secondary",
          code: "#000"
        }]
      },
      sizes: [],
      images:[{
        public_id: "product/mhpcchmackb8wjphvth2",
        secure_url: "https://res.cloudinary.com/dlqnx8srw/image/upload/v1728696317/product/mhpcchmackb8wjphvth2.jpg"
      }]
    },
  });

  const onSubmit = (data: z.infer<typeof ProductSchema>) => {
    startTransition(async ()=> {
      const res = await saveProduct(data);
      if (res.type === "success") form.reset();
      ToastSave(res);
    })
  };


  return (
    <main>
      <Form {...form} >
        <form onSubmit={form.handleSubmit(onSubmit)} id="myForm" className="min-h-[calc(100vh-139px)] flex flex-col justify-between w-full">
          <main className="w-full flex gap-x-4 p-4 pt-0">
            <section className="w-3/4 space-y-4">
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
            {/* --------------------------- */}
            <section className="w-1/4">
                <CardPreviewProduct
                  marque={form.getValues().marque}
                  model={form.getValues().model}
                  description={form.getValues().description}
                  price={form.getValues().price}
                  public_id={form.getValues().images[0].public_id}
                />
            </section>
          </main>
          <Footer onReset={form.reset} loading={isLoading} />
        </form>
      </Form>
    </main>
  );
};
