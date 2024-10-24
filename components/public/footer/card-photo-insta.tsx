import Link from "next/link"
import Image from "next/image"

interface CardPhotoInstaProps{
    href?: string;
    src: string;
}

export const CardPhotoInsta = ({href="#", src}: CardPhotoInstaProps) => {
  return (
    <Link href={href}>
        <Image 
            src={src} 
            height={200} 
            width={200} 
            alt="photo instagram"
            className="object-cover h-14"
            ></Image>
    </Link>
  )
}
