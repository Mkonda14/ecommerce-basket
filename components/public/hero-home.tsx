import { SectionLeft } from "./heros/home/section-left"
import { SectionRigth } from "./heros/home/section-rigth"



export const HeroHome = () => {
  return (
    <header className="w-full min-h-[50vh] flex items-center bg-gradiant-gray">
        <section className="container h-full flex items-center gap-x-4">
            <SectionLeft />
            <SectionRigth />
        </section>
    </header>
  )
}
