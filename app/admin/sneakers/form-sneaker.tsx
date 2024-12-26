"use client"

import { z } from "zod";
import { useForm } from "react-hook-form";
import { ProductSchema } from "@/models/product";

import { Form } from "@/components/ui/form";

import { SectionOne } from "@/components/admin/form/section-form-product/section-one";
import { SectionTwo } from "@/components/admin/form/section-form-product/section-two";
import { SectionThree } from "@/components/admin/form/section-form-product/section-three";
import { SectionFour } from "@/components/admin/form/section-form-product/section-four";

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
  tags: {id: string, name: string}[],
  colorPrimaries: {color: string, name: string, sizes: {size: number, quantity: number}[]}[] | null,
}

interface FormProductProps{
  sneakerId?: string;
  sneaker?: Sneaker & Product
}


export const FormSneaker = ({sneakerId, sneaker}: FormProductProps) => {

  const [isLoading, startTransition] = useTransition();
  const router = useRouter();
  const queryClient = useQueryClient();
  const onChangeReset = useResetForm.use.onChange();

  const form = useForm<z.infer<typeof ProductSchema>>({
    resolver: zodResolver(ProductSchema),
    defaultValues: {
      marque: sneaker?.marque || "",
      model: sneaker?.model || "",
      description: sneaker?.description || "",
      isPromo: sneaker?.isPromo || false,
      reduction: `${((sneaker?.reduction || 0) * 100) || "0"}`,
      isCustomByGraffiti: sneaker?.isCustomByGraffiti || false,
      price: `${sneaker?.price || "0.0"}`,
      stock: `${sneaker?.stock || 1}`,
      category: sneaker?.categoryId || "",
      colorPrimaries: sneaker?.colorPrimaries?.map((colorPrimary)=>(
        {
          name: colorPrimary?.name || "black",
          code: colorPrimary?.color || "#333",
          sizes: colorPrimary?.sizes.map(size => ({size: `${size.size}`, quantity: `${size.quantity}`})) || [{
            size: "42",
            quantity: "1"
          }],
        }
      )) || [{
          name: "black",
          code: "#333",
          sizes: [{ size: "42",
                    quantity: "1"
                  }],
      }],
      tags: sneaker?.tags.map(tag => ({value: tag.id, label: tag.name})) || [],
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
      console.log(data);
      sneakerId ? await executeUpdated({sneakerId, data}) : await executeSave(data);
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

            </section>
          </main>
          <Footer 
            onReset={form.reset} 
            name={sneakerId ? "Updated sneaker" : "Save sneaker"} 
            loading={isLoading} 
          />
        </form>
      </Form>
    </main>
  );
};
