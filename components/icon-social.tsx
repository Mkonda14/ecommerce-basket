import { ImWhatsapp } from "react-icons/im"; 
import { BsSnapchat } from "react-icons/bs"; 
import { CgInstagram } from "react-icons/cg"; 
import { BsTwitter } from "react-icons/bs"; 
import { FaFacebook } from "react-icons/fa"; 
import { IconType } from "react-icons/lib";
import { cn } from "@/lib/utils";

const icons = {
    facebook: FaFacebook,
    twitter: BsTwitter,
    instagram: CgInstagram,
    snapchat: BsSnapchat,
    whatsapp: ImWhatsapp,
}

const sizes = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-8 w-8",
    xl: "h-12 w-12"
}

const colors = {
    facebook: "text-[#3B5098]",
    twitter: "text-[#1DA1F2]",
    instagram: "text-[#E1306C]",
    snapchat: "text-[#FFFC00]",
    whatsapp: "text-[#25D366]",
}

interface IconSocialProps{
    name: keyof typeof icons;
    size?: keyof typeof sizes;
}

export const IconSocial = ({name, size="md"}: IconSocialProps) => {
    const Icon : IconType = icons[name];
    return (
        <Icon className={cn(sizes[size], colors[name])} />
    )
}
