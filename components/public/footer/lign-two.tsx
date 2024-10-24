import { FaAmazonPay } from "react-icons/fa"; 
import { SlPaypal } from "react-icons/sl"; 
import { FaCcVisa } from "react-icons/fa"; 
import { Typographie } from "@/components/typographie";


export const LignTwo = () => {
  return (
    <div className="w-full container flex items-center justify-between py-2">
      <div className="flex items-center gap-x-4">
        <FaCcVisa className="w-12 h-12" /> 
        <SlPaypal className="w-12 h-9"  /> 
        <FaAmazonPay className="w-12 h-12" />
      </div>
      <Typographie component="p" variant="p" size="md">
        © 2024 beautyncenter theme Design Themes
      </Typographie>
    </div>
  )
}
