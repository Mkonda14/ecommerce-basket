"use client"

import { z } from "zod";
import { useForm } from "react-hook-form";
import { ProductSchema } from "@/models/product";

import { Form } from "@/components/ui/form";

import { SectionOne } from "@/components/admin/form/section-form-product/section-one";
import { SectionTwo } from "@/components/admin/form/section-form-product/section-two";
import { SectionThree } from "@/components/admin/form/section-form-product/section-three";
import { SectionFour } from "@/components/admin/form/section-form-product/section-four";
import { SectionFive } from "@/components/admin/form/section-form-product/section-five";

import { Footer } from "@/components/admin/form/footer";

import { saveProduct } from "@/actions/product/save";
import { updateProduct } from "@/actions/product/update";

import { useTransition } from "react";
import { ToastSave } from "@/hooks/use-toast-save";
import { Sneaker } from "@prisma/client";
import { zodResolver } from "@hookform/resolvers/zod";

import { useRouter } from "next/navigation";
import { useAction } from "next-safe-action/hooks";
import { useQueryClient } from "@tanstack/react-query";
import { useResetForm } from "@/hooks/stores/use-form-store";

type Product = {
  themes: {id: string}[],
  colorSecondaries: {color: string, name: string}[],
  sizes: {size: number, quantity: number}[],
  tags: {id: string, name: string}[],
  colorPrimary: {color: string, name: string} | null,
}

interface FormProductProps{
  productId?: string;
  product?: Sneaker & Product
}


export const FormProduct = ({productId, product}: FormProductProps) => {

  const [isLoading, startTransition] = useTransition();
  const router = useRouter();
  const queryClient = useQueryClient();
  const onChangeReset = useResetForm.use.onChange();

  const form = useForm<z.infer<typeof ProductSchema>>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      marque: product?.marque || "",
      model: product?.model || "",
      description: product?.description || "",
      isPromo: product?.isPromo || false,
      promoPrice: `${product?.promoPrice || "0.0"}`,
      price: `${product?.price || "0.0"}`,
      stock: `${product?.stock || "1"}`,
      themes: product?.themes.map(theme => theme.id) || [],
      category: product?.categoryId || "",
      colors: {
        primary: {
          name: product?.colorPrimary?.name || "primary",
          code: product?.colorPrimary?.color || "#000"
        },
        secondary: product?.colorSecondaries.map(clr => ({code: clr.color, name: clr.name})) || [{
          name: "secondary",
          code: "#000"
        }]
      },
      sizes: product?.sizes.map(size => ({size: `${size.size}`, quantity: `${size.quantity}`})) || [{
        size: "42",
        quantity: "1"
      }],
      tags: product?.tags.map(tag => ({value: tag.id, label: tag.name})) || [],
      images:[{
        public_id: "product/mhpcchmackb8wjphvth2",
        secure_url: "https://res.cloudinary.com/dlqnx8srw/image/upload/v1728696317/product/mhpcchmackb8wjphvth2.jpg"
      }]
    },
  });


  const { executeAsync: executeSave } = useAction(saveProduct,{
      onSuccess: ({data}) =>{
        ToastSave({
          type: 'success',
          message: `${data?.message}`
        })
        form.reset();
        onChangeReset(true);
        queryClient.invalidateQueries({queryKey:["products"]});
      },
      onError: ({error}) =>{
        ToastSave({
          type: 'error',
          message: `${error.serverError?.serverError}`
        })
      }
    }
  )
  const { executeAsync: executeUpdated } = useAction(updateProduct,{
      onSuccess: ({data}) =>{
        ToastSave({
          type: 'success',
          message: `${data?.message}`
        })
        queryClient.invalidateQueries({queryKey:["products"]});
        router.push("/admin/products")
      },
      onError: ({error}) =>{
        ToastSave({
          type: 'error',
          message: `${error.serverError?.serverError}`
        })
      }
    }
  )

  const onSubmit = (data: z.infer<typeof ProductSchema>) => {
    startTransition(async ()=> {
      productId ? await executeUpdated({productId, data}) : await executeSave(data);
    })
  };

 
  return (
    <main>
      <Form {...form} >
        <form onSubmit={form.handleSubmit(onSubmit)} id="myForm" className="min-h-[calc(100vh-139px)] flex flex-col justify-between w-full">
          <main className="w-full flex gap-x-4 p-4 pt-0">
            <section className="w-full space-y-4">
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
            name={productId ? "Updated sneaker" : "Save sneaker"} 
            loading={isLoading} 
          />
        </form>
      </Form>
    </main>
  );
};
