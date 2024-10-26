import { Footer } from "@/components/public/footer";
import { HeroHome } from "@/components/public/hero-home";
import { Navbar } from "@/components/public/navbar";
import { Subscribe } from "@/components/public/subscribe";

export default function Home() {
  return (
    <div className="">
      <Navbar />
      <HeroHome />
      
      <Subscribe />
      <Footer />
    </div>
  );
}
