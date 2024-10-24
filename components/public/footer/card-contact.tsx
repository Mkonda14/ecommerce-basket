import { BsTelephone } from "react-icons/bs"; 
import { FiMapPin } from "react-icons/fi"; 
import { AiOutlineMail } from "react-icons/ai"; 
import { IconType } from "react-icons/lib";
import { Typographie } from "@/components/typographie";
import Link from "next/link";

const icons = {
    adresse: FiMapPin,
    email: AiOutlineMail,
    phone: BsTelephone
}

interface CardContactProps{
    title: string;
    children: React.ReactNode;
    href?: string;
    type: keyof typeof icons;
}

export const CardContact = ({title, children, href="#", type}:CardContactProps) => {

    const Icon : IconType = icons[type];
    let prefix : string = "";

    switch (type) {
        case "email":
            prefix = "mailto"
            break;
        case "phone":
            prefix = "tel:+"
            break;
        default:
            prefix = "http://"
            break;
    }

    return (
        <div className="flex items-center gap-x-4">
            <div className="w-14 h-14 flex justify-center items-center border-2 border-slate-700">
                <Icon className="w-8 h-8" />
            </div>
            {type === "adresse" ?
                <Typographie component="p" variant="p" size="md">
                    <span className="text-lg font-bold capitalize">{title}</span> : <span>{children}</span>
                </Typographie> :
                <Link href={prefix + href}>
                    <Typographie component="p" variant="p" size="md">
                        <span className="text-lg font-bold capitalize">{title}</span> : <span>{children}</span>
                    </Typographie>
                </Link>
            }
        </div>
    )
}
