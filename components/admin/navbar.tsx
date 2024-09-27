
import { IoMdNotificationsOutline } from "react-icons/io"; 
import { MdAdd } from "react-icons/md"; 
import { BsChatLeftQuote } from "react-icons/bs"; 
import { IoMdAdd } from "react-icons/io"; 
import { Button } from "../ui/button"
import { InputSearch } from "./navbar/input-search"
import { DropdownMenuUser } from "./navbar/dropdown-menuUser";
import { DropdownMenuDemo } from "../design-system/dropdown-menu";


export const Navbar = () => {
    return (
        <nav className="w-full flex items-center justify-between px-6 py-3 bg-white">
            <InputSearch />
            <div className="flex justify-between items-center gap-x-4">
              <Button className="space-x-2"> <MdAdd className="h-5 w-5" /> <span>Create</span> </Button>
              <Button size="icon" variant={"outline"} className="border-none shadow-none">
                <span className="relative">
                  <BsChatLeftQuote className="h-5 w-5" />
                  <span className="h-2 w-2 rounded-full bg-red-600 absolute -top-1 -right-1"></span>
                </span>
              </Button>
              <Button size="icon" variant={"outline"} className="border-none shadow-none">
                <span className="relative">
                  <IoMdNotificationsOutline className="h-6 w-6" />
                  <span className="h-2 w-2 rounded-full bg-red-600 absolute top-0 right-0"></span>
                </span>
              </Button>
              <DropdownMenuUser />
            </div>
        </nav>
    )
}
