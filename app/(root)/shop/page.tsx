import { SectionCustom } from "@/components/public/section-custom";
import { HeroShop } from "@/components/public/shop/hero-shop";
import { SectionProducts } from "@/components/public/shop/section-products";


export default function PageShop() {
  return (
    <section>
      <HeroShop />
      <SectionProducts />
      <SectionCustom />
    </section>
  )
}
