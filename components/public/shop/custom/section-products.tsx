"use client"

import { getProductCustom } from "@/actions/custom";
import { useQuery } from "@tanstack/react-query";
import { CardCustom } from "./card-custom";

export const SectionProductCustoms = () => {

    const queryKey = ["sneaker-customizations"];

    const {data: sneakers} = useQuery({
        queryKey: queryKey,
        queryFn: ()=> getProductCustom()
    })

    return (
        <section className="w-full grid grid-cols-4 gap-4 py-4">
            {sneakers?.map((sneaker)=> (
                <CardCustom
                    key={sneaker.id}
                    {...sneaker}
                />
            ))}
            <CardCustom
                 marque="nike"
                 model="Air force 1"
                 description="Une excellente sneaker avec du charisme et l'elegance"
                 price={240}
                 isPromo={false}
                 promoPrice={100}
                 tags={[{name: "confort"}, {name: "sportive"}]}
                 images={[{publicId: "/assets/imgs/basket-one.jpg"}]}
                 slug="airforceSlug"
                 id="airforceId"
            />
        </section>
    )
}
