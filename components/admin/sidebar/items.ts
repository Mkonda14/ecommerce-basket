import { AiOutlineShop } from "react-icons/ai"; 
import { BiUserCircle } from "react-icons/bi"; 
import { BiDiamond } from "react-icons/bi"; 
import { NavGroupItemProps } from "./nav-group-item"
import { FiHome } from "react-icons/fi"; 



export const Items: NavGroupItemProps[] = [
    {
        label: "Dashboard",
        icon: FiHome,
        subHref: "/admin",
    },
    {
        isGroup: true,
        label: "Products",
        icon: BiDiamond,
        subHref: "/admin/product/add",
        items: [
            {
                label: "Dashboard",
                href: "/products/dashboard",
                notif: 2
            },
            {
                label: "Drafts",
                href: "/products/drafts",
            },
            {
                label: "Released",
                href: "/products/released",
            },
            {
                label: "Scheduled",
                href: "/products/scheduled",
                notif: 8
            },
        ]
    },
    {
        isGroup: true,
        label: "Custumers",
        icon: BiUserCircle,
        items: [
            {
                label: "Dashboard",
                href: "/products/dashboard",
            },
            {
                label: "Comments",
                href: "/products/comments",
                notif: 2
            },
            {
                label: "Livraisons",
                href: "/products/livraisons",
                notif: 8
            },
        ]
    },
    {
        label: "Shop",
        icon: AiOutlineShop,
        subHref: "/admin",
    },
]