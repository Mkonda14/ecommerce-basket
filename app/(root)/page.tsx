
import { HeroHome } from "@/components/public/home/hero-home";
import { SectionCustom } from "@/components/public/section-custom";
import { DernierCreations } from "@/components/public/home/section-dernier-creations";
import { SectionService } from "@/components/public/home/section-service";
import { SectionTheme } from "@/components/public/home/section-theme";

export default function Home() {
  return (
    <section className="">
      <HeroHome />

      <SectionService />
      <DernierCreations />

      <SectionCustom />
      <SectionTheme />
    </section>
  );
}
