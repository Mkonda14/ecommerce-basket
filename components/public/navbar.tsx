import { LignOne } from "./navbar/lign-one"
import { LignThree } from "./navbar/lign-three"
import { LignTwo } from "./navbar/lign-two"

export const Navbar = () => {
  return (
    <nav className="w-full flex flex-col items-center bg-slate-100">
       <LignOne />
       <LignTwo />
       <LignThree />
    </nav>
  )
}
