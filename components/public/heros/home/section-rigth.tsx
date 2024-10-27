
import { Typographie } from "@/components/typographie"
import Image from "next/image"

export const SectionRigth = () => {
  return (
    <section className='w-1/2 min-h-full h-[60vh] flex justify-center'>
      <section className="w-[70%] h-full relative">
        <div className="">
          <Typographie component="blockquote" variant="blockquote" size="md">Thème :</Typographie>
          <Typographie component="h3" variant="h3" size="lg">Looney Tunes</Typographie>
        </div>
        <div className="w-20 h-28 flex flex-col justify-center items-center gap-y-0 bg-emerald-500 absolute top-0 left-3/4 text-white tag">
          <h4 className="text-lg">- 40 %</h4>
          <h4 className="text-lg">OFF</h4>
        </div>
          <Image 
            src="/assets/pngs/tools.png" 
            alt="Image le tools"
            width={400}
            height={800}
            className="h-[80%] w-[100%] object-cover absolute top-[55%] left-1/2 -translate-x-1/2 -translate-y-1/2"
          />
      </section>
    </section>
  )
}
