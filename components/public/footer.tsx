import { LignOne } from "./footer/lign-one"
import { LignTwo } from "./footer/lign-two"


export const Footer = () => {
  return (
    <footer className="w-full flex flex-col items-center bg-slate-100">
      <LignOne />
      <LignTwo />
    </footer>
  )
}
