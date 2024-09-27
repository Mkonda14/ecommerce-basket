import { BsCheckSquare } from "react-icons/bs"; 
import { ImWarning } from "react-icons/im"; 
import { IconType } from 'react-icons/lib';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert'
import { cn } from "@/lib/utils";

export interface FormResponseProps{
    type?: "error" | "success";
    msg?: string;
}

export const FormResponse = ({type, msg}:FormResponseProps) => {

    if(!msg || !type) return null;

    let Icon: IconType;
    let variant : "destructive" | "default";

    const styles ={
        success: "bg-emerald-100 text-emerald-800 border-emerald-300",
        error: "bg-red-100 text-red-800 border-red-300",
    }

    switch (type) {
        case "error":
            Icon = ImWarning;
            variant = "destructive"
            break;
        default:
            Icon = BsCheckSquare;
            variant = "default";
    }

    return (
        <Alert variant={variant} className={cn("px-2 py-1", styles[type])}>
            <div className="flex items-center gap-x-2">
                <Icon className="w-5 h-5 mb-1" />
                <AlertTitle className="font-semibold text-lg">{type}</AlertTitle>
            </div>
            <AlertDescription className="pl-8">{msg}</AlertDescription>
        </Alert>
    )
}
