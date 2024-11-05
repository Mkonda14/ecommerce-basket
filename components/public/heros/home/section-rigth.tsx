
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

export const SectionRigth = () => {
  return (
    <section className='w-1/2 min-h-full h-[60vh] flex justify-center'>
      <section className="w-[85%] h-full relative">
        <Badge className="bg-emerald-500 absolute top-8 left-3/4 text-white">Thème du moment</Badge>
        <Image 
          src="/assets/pngs/tools.png" 
          alt="Image le tools"
          width={400}
          height={800}
          className="h-[80%] w-[100%] object-contain absolute top-[55%] left-1/2 -translate-x-1/2 -translate-y-1/2"
        />
      </section>
    </section>
  )
}
