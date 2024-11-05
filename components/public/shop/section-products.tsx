

import { Filter } from "./section-products/filter";
import { Paginations } from "./section-products/pagination";
import { Products } from "./section-products/products";
import { Sorts } from "./section-products/sorts";


export const SectionProducts = () => {
    return (
        <section className="mt-8">
            <section className="container flex gap-x-4">
                <Filter />
                <section className="w-3/4 space-y-4">
                    <Sorts />
                    <Products />
                    <Paginations />
                </section>
            </section>
        </section>
    )
}
