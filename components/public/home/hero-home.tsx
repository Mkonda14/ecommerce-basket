import { SectionLeft } from "../heros/home/section-left"
import { SectionRigth } from "../heros/home/section-rigth"



export const HeroHome = () => {
  return (
    <header className="w-full min-h-[60vh] flex items-center bg-gradiant-gray">
        <section className="container h-full flex items-center gap-x-8 py-10">
            <SectionLeft />
            <SectionRigth />
        </section>
    </header>
  )
}
