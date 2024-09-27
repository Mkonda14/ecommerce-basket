import { BsQuestionCircle } from "react-icons/bs"; 
import { MdDashboard } from "react-icons/md"; 
import { Button } from "../ui/button"
import { Typographie } from "../typographie";
import { Items } from "./sidebar/items";
import { NavGroupItem } from "./sidebar/nav-group-item";
import { ThemeToggle } from "../theme-toggle";
import Link from "next/link";

export const SidebarAdmin = () => {
  return (
    <aside className="w-[18%] flex flex-col p-3 bg-white">
        <header className="flex gap-x-2 mb-8">
            <Button variant={"outline"} size={"icon"} className="w-12 h-12 p-0 rounded-none border-none shadow-none">
                <MdDashboard className="w-14 h-14" />
            </Button>
            <div className="">
                <Typographie component="h2" variant="h2" size="lg">Dashboard</Typographie>
                <Typographie component="p" variant="p" size="sm" className="-mt-2">Policy Privacy</Typographie>
            </div>
        </header>
        <nav className="flex-grow space-y-2">
            {Items.map((item) =>(
                <NavGroupItem key={item.label} {...item} />
            ))}
        </nav>
        <footer className="w-full self-end space-y-4">
            <Button variant={"link"} className="flex justify-between items-center gap-x-2 p-0" asChild>
                <Link href="#">
                    <BsQuestionCircle className="h-5 w-5" />
                    <Typographie component="p" variant="p" size="sm" className="flex-grow">Help & getting started</Typographie>
                    <span className="bg-violet-200 px-1 rounded-sm">8</span>
                </Link>
            </Button>
            <ThemeToggle />
        </footer>
    </aside>
  )
}
