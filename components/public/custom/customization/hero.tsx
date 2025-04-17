import { Typographie } from "@/components/typographie";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Info } from "lucide-react"; // Import Lucide React icons
import { Badge } from "@/components/ui/badge";

export const Hero = () => {
  return (
    <header className="container w-full h-[40vh] mt-8 bg-[url('/assets/imgs/bg/custom-graffiti-sneaker.png')] bg-center bg-cover bg-no-repeat">
      <section className="w-full h-full backdrop-blur-[2px] bg-black/50 flex flex-col justify-center items-center text-center p-4">
        <Badge className="bg-emerald-500 hover:bg-emerald-700 mb-2">Customization</Badge>
        <div className="text-white mb-4">
          <Typographie component="h2" variant="h3" size="lg" className="text-white max-w-xl">
            Formulaire de Commande
          </Typographie>
        </div>
        <Typographie component="p" variant="p" size="md" className="text-white max-w-xl">
          Personnalisez vos sneakers avec notre formulaire de commande. Sélectionnez vos préférences de graffiti, couleurs et ajoutez des instructions spécifiques pour créer des baskets uniques selon vos goûts.
        </Typographie>
        <Link href="#" className={cn(buttonVariants(), "mt-6 bg-emerald-500 hover:bg-emerald-700")}>
            <Info className="w-5 h-5" /> <span>Savoir plus</span>
        </Link>
      </section>
    </header>
  );
};
