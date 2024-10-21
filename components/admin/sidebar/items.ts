import { AiOutlineTag } from "react-icons/ai"; 
import { DiIllustrator } from "react-icons/di"; 
import { MdOutlineCategory } from "react-icons/md"; 
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
        subHref: "/admin/products/add",
        items: [
            {
                label: "Dashboard",
                href: "/admin/products/dashboard",
                notif: 2
            },
            {
                label: "Create Product",
                href: "/admin/products/add",
            },
            {
                label: "Table Products",
                href: "/admin/products",
            },
            {
                label: "Scheduled",
                href: "#",
                notif: 8
            },
        ]
    },
    {
        isGroup: true,
        label: "Categories",
        icon: MdOutlineCategory,
        subHref: "/admin/categories/add",
        items: [
            {
                label: "Dashboard",
                href: "/admin/categories/dashboard",
                notif: 2
            },
            {
                label: "Create Category",
                href: "/admin/categories/add",
            },
            {
                label: "Table Catégories",
                href: "/admin/categories",
            }
        ]
    },
    {
        isGroup: true,
        label: "Thèmes",
        icon: DiIllustrator,
        subHref: "/admin/themes/add",
        items: [
            {
                label: "Dashboard",
                href: "/admin/themes/dashboard",
                notif: 2
            },
            {
                label: "Create Thème",
                href: "/admin/themes/add",
            },
            {
                label: "Table Thèmes",
                href: "/admin/themes",
            }
        ]
    },
    {
        isGroup: true,
        label: "Tags",
        icon: AiOutlineTag,
        subHref: "/admin/tags/add",
        items: [
            {
                label: "Dashboard",
                href: "/admin/tags/dashboard",
                notif: 2
            },
            {
                label: "Create Tag",
                href: "/admin/tags/add",
            },
            {
                label: "Table Tags",
                href: "/admin/tags",
            }
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