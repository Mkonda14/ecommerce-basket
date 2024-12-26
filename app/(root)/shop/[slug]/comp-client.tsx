"use client";

import { useQuery } from "@tanstack/react-query";
import { notFound } from "next/navigation";

import { TabDescriptif } from "@/components/public/shop/show-product/tab-descriptif";

import { SectionSuggestion } from "@/components/public/shop/show-product/section-suggestion";
import { getCardSuggestions } from "@/actions/custom/suggestion";
import { getCustomBySlug } from "@/actions/public-actions/show";
import { Container } from "@/components/container";
import { LoaderSpin } from "@/components/loader-spin";
import { SectionDetailProduct } from "@/components/public/shop/show-product/section-detail-product";
import { TtransToCardCustom, TtransToShowCustom } from "@/actions/translate";

interface ICompClient {
  slug: string | undefined;
}

export const CompClient = ({ slug }: ICompClient) => {
  const queryKey = ["customs",`${slug}`];
  const queryKey2 = ["customs",`${slug}`,`suggestions`];

  const iSneakers: TtransToCardCustom[] = [];

  const { data: custom, isLoading } = useQuery<TtransToShowCustom>({
    queryKey: queryKey,
    queryFn: () => getCustomBySlug(slug || ""),
    enabled: !!slug,
  });

  const { data: customs } = useQuery<TtransToCardCustom[]>({
    queryKey: queryKey2,
    queryFn: () =>
      getCardSuggestions({slug}),
    initialData: iSneakers,
  });

  if (!custom && !isLoading) {
    return notFound();
  }

  if (isLoading) {
    return (
      <main className="w-full h-[50vh] flex justify-center items-center">
        <LoaderSpin size="xl" />
      </main>
    );
  }

  return (
    <Container maxWidth>
      {/* section description */}
      <SectionDetailProduct data={custom || null} />
      {/* section tab */}
      <section className="mt-8 flex gap-x-8 w-full">
        <section className="w-5/12"></section>
        <section className="w-6/12 flex-1">
          <TabDescriptif
            categorySneaker={custom?.sneaker.category}
            themes={custom?.themes || []}
            tags={custom?.sneaker.tags || []}
          />
        </section>
      </section>
      {/* section suggestion */}
      <SectionSuggestion customs={customs} />
    </Container>
  );
};
