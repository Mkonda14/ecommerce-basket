import { CardContact } from "./card-contact"
import { TitleLink } from "./title-link"
import Link from "next/link"
import { CardPhotoInsta } from "./card-photo-insta"
import { IconSocial } from "@/components/icon-social"

export const LignOne = () => {
  return (
    <section className="w-full container bg-gray-200 flex justify-between py-4">
      <section>
        <TitleLink>CONTACT</TitleLink>
        <div className="space-y-2 mb-5">
          <CardContact type="adresse" title="adresse">C/ Bumbu, av. KIMAYALA n° 150bis</CardContact>
          <CardContact type="email" title="e-mail" href="">martinkonda14@gmail.com</CardContact>
          <CardContact type="phone" title="phone" href="">+243 89 17 40 689</CardContact>
        </div>

        <TitleLink>CONNECT US</TitleLink>
        <div className="flex items-center gap-x-4">
          <IconSocial size={"lg"} name={"facebook"} />
          <IconSocial size={"lg"} name={"instagram"} />
          <IconSocial size={"lg"} name={"snapchat"} />
          <IconSocial size={"lg"} name={"twitter"} />
          <IconSocial size={"lg"} name={"whatsapp"} />
        </div>
      </section>

      <section>
        <TitleLink>SHOP LINKS</TitleLink>
        <div className="flex flex-col gap-y-2">
          <Link href="#">Home</Link>
          <Link href="#">Shop</Link>
          <Link href="#">New sneaker</Link>
          <Link href="#">Promotion</Link>
          <Link href="#">About Us</Link>
          <Link href="#">Contact Us</Link>
          <Link href="#">FAQs</Link>
        </div>
      </section>

      <section>
        <TitleLink>INFORMATION</TitleLink>
        <div className="flex flex-col gap-y-2">
          <Link href="#">Home</Link>
          <Link href="#">Shop</Link>
          <Link href="#">New sneaker</Link>
          <Link href="#">Promotion</Link>
          <Link href="#">About Us</Link>
          <Link href="#">Contact Us</Link>
          <Link href="#">FAQs</Link>
        </div>
      </section>

      <section className="w-1/5">
        <TitleLink>INSTAGRAM PHOTOS</TitleLink>
        <div className="grid grid-cols-4 gap-2 mb-5">
          <CardPhotoInsta src={"/assets/imgs/basket-one.jpg"} href={"#"} />
          <CardPhotoInsta src={"/assets/imgs/basket-two.jpg"} href={"#"} />
          <CardPhotoInsta src={"/assets/imgs/lv.jpg"} href={"#"} />
          <CardPhotoInsta src={"/assets/imgs/chaussure.jpg"} href={"#"} />
          <CardPhotoInsta src={"/assets/imgs/dior.jpg"} href={"#"} />
          <CardPhotoInsta src={"/assets/imgs/givenchy.jpg"} href={"#"} />
        </div>
      </section>
    </section>
  )
}
