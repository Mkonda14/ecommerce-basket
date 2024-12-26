"use server";

import { Typographie } from "@/components/typographie";
import { FormCustom } from "@/app/admin/customs/form-custom";

import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getThemes } from "@/actions/theme";
import { getSneakerSelectForm } from "@/actions/product/select";
import { getCustomUpdateById } from "@/actions/custom";
import { getCategoryCustoms } from "@/actions/custom/category";

interface ProductUpdateProps {
  params: {
    customId: string;
  };
}

export default async function ProductUpdate({ params }: ProductUpdateProps) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["themes-form"],
    queryFn: () => getThemes(),
  });

  await queryClient.prefetchQuery({
    queryKey: ["sneakers-form"],
    queryFn: () => getSneakerSelectForm(),
  });

  await queryClient.prefetchQuery({
      queryKey: ['categories-form'],
      queryFn: ()=> getCategoryCustoms(),
  })

  // Get product by ID and populate form with data
  const custom = await getCustomUpdateById(params.customId);
  if (!custom) {
    return <p className="text-center text-2xl">Page not found</p>;
  }

  return (
    <main className="">
      <Typographie component={"h1"} variant="h1" size="lg" className="p-4">
        Updated Custom
      </Typographie>
      <main className="w-full">
        <HydrationBoundary state={dehydrate(queryClient)}>
          <FormCustom customId={params.customId} custom={custom} />
        </HydrationBoundary>
      </main>
    </main>
  );
}
