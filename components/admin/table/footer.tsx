import { BiCheckDouble } from "react-icons/bi"; 
import { Typographie } from "../../typographie"
import { Button } from "../../ui/button";

interface FooterProps{
    onReset?: ()=>void;
    nbrSelect: number;
}

export const Footer = ({onReset, nbrSelect}:FooterProps) => {

    return (
        <footer className="flex justify-between items-center px-6 p-3 bg-white">
           <Typographie component="p" className="text-slate-600 flex items-center space-x-4"> 
                <BiCheckDouble className="w-6 h-6" /> 
                {nbrSelect ?
                 <span>Non product <span className="font-semibold">selected</span></span> :
                 <span>product selected <span className="font-semibold">{nbrSelect}</span></span>               
                }
            </Typographie>
           <div className="flex gap-x-2">
                <Button variant={"outline"} type="button" onClick={onReset}>Reset form</Button>
                <Button variant={"destructive"}>Delete</Button>
           </div>
        </footer>
    )
}
