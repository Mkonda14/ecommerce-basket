import { Footer } from "@/components/public/footer";
import { HeroHome } from "@/components/public/hero-home";
import { Navbar } from "@/components/public/navbar";
import { SectionService } from "@/components/public/section-service";
import { SectionTheme } from "@/components/public/section-theme";
import { Subscribe } from "@/components/public/subscribe";

export default function Home() {
  return (
    <div className="">
      <Navbar />
      <HeroHome />

      <SectionService />
      <SectionTheme />
      
      <Subscribe />
      <Footer />
    </div>
  );
}
