import { FiMoreVertical } from "react-icons/fi"; 
import { BiCheckDouble } from "react-icons/bi"; 
import { Typographie } from "../../typographie"
import { Button } from "../../ui/button";
import { LoaderSpin } from "@/components/loader-spin";

interface FooterProps{
    onReset?: ()=>void;
    loading: boolean;
}

export const Footer = ({onReset, loading}:FooterProps) => {

    return (
        <footer className="flex justify-between items-center px-6 p-3 bg-white">
           <Typographie component="p" className="text-slate-600 flex items-center space-x-4"> 
                <BiCheckDouble className="w-6 h-6" /> 
                <span>Last saved <span className="font-semibold">Oct 4, 2021 - 23:32</span></span> 
            </Typographie>
           <div className="flex gap-x-2">
                <Button variant={"outline"} type="button" onClick={onReset}>Reset form</Button>
                <Button disabled={loading}>
                    {loading ? <LoaderSpin /> : <span>Save object</span> }
                </Button>
                <Button variant={"outline"} size={"icon"}><FiMoreVertical /></Button>
           </div>
        </footer>
    )
}
