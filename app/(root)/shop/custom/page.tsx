import { Container } from "@/components/container";
import { HeroShop } from "@/components/public/shop/hero-shop";
import { Typographie } from "@/components/typographie";

export default function PageCustom() {
    return (
        <section>
            <HeroShop />
            <Container>
                <Typographie component="h2" variant="h2" size="lg">Customization sneakers</Typographie>
            </Container>
        </section>
    )
}
