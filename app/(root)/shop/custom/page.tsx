import { Container } from "@/components/container";
import { SectionGraffiti } from "@/components/public/shop/custom/section-graffiti";
import { SectionGrid } from "@/components/public/shop/custom/section-grid";
import { SectionProductCustoms } from "@/components/public/shop/custom/section-products";
import { HeroShop } from "@/components/public/shop/hero-shop";
import { Typographie } from "@/components/typographie";

export default function PageCustom() {
    return (
        <section>
            <HeroShop title="Customization" />
            <Container>
                <Typographie component="h2" variant="h2" size="lg">Customization sneakers</Typographie>
                <Typographie component="p" variant="p" size="md" className="text-muted-foreground">
                    Choisisse le sneaker à laquelle vous aimeriez que on customiser avec de graffiti de notre choix bien sûre.
                </Typographie>
                
                <SectionProductCustoms />
                <SectionGraffiti />
                <SectionGrid />
            </Container>
        </section>
    )
}
