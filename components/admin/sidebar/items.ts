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
        subHref: "/admin/product/add",
        items: [
            {
                label: "Dashboard",
                href: "/admin/product",
                notif: 2
            },
            {
                label: "Create Product",
                href: "/admin/product/add",
            },
            {
                label: "Table Products",
                href: "/admin/product/products",
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
        subHref: "/admin/category/add",
        items: [
            {
                label: "Dashboard",
                href: "/admin/category",
                notif: 2
            },
            {
                label: "Create Category",
                href: "/admin/category/add",
            },
            {
                label: "Table Catégories",
                href: "/admin/category/categories",
            }
        ]
    },
    {
        isGroup: true,
        label: "Thèmes",
        icon: DiIllustrator,
        subHref: "/admin/theme/add",
        items: [
            {
                label: "Dashboard",
                href: "/admin/theme",
                notif: 2
            },
            {
                label: "Create Thème",
                href: "/admin/theme/add",
            },
            {
                label: "Table Thèmes",
                href: "/admin/theme/themes",
            }
        ]
    },
    {
        isGroup: true,
        label: "Tags",
        icon: AiOutlineTag,
        subHref: "/admin/tag/add",
        items: [
            {
                label: "Dashboard",
                href: "/admin/tag",
                notif: 2
            },
            {
                label: "Create Tag",
                href: "/admin/tag/add",
            },
            {
                label: "Table Tags",
                href: "/admin/tag/tags",
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