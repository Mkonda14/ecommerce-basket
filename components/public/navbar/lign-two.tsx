import { BtnCart } from "./btn-cart"
import { InputSearch } from "./input-search"
import { LogoMarket } from "./logo-market"

export const LignTwo = () => {
  return (
    <section className="w-full h-2/5 container flex items-center justify-between">
        <LogoMarket />
        <div className="flex items-center gap-x-8">
            <InputSearch />
            <BtnCart />
        </div>
    </section>  )
}
