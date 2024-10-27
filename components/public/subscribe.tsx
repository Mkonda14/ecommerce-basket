import Link from "next/link"
import { Typographie } from "../typographie"
import { InputSubscribe } from "./subscribe/input-subscribe"


export const Subscribe = () => {
  return (
    <section className="container w-2/4 flex flex-col items-center gap-y-4 py-8">
            <Typographie component="h2" variant="h2" size="xl" className="text-center">
                Subscribe to our newsletter to get updates to our latest collections Lorem, ipsum dolor.
            </Typographie>

            <Typographie component="p" variant="p" size="lg" className="text-center">
                Get 20% off on you first order just by subscribing to our newsletter
            </Typographie>

            <InputSubscribe />

            <div className="w-1/2 flex justify-center">
                <Typographie component="p" variant="p" size="md" className="text-center">
                    You will  be able to subscribe at any tame Read our Privacy Policy <Link href="#" className="font-bold">here</Link>
                </Typographie>
            </div>
    </section>
  )
}
