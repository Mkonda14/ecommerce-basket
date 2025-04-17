"use client"

import { Button } from "@/components/ui/button";
import { ToastSave } from "@/hooks/use-toast-save";
import { useRouter } from "next/navigation";
import { BiEdit } from "react-icons/bi";

interface IBtnCustom{
    chooseSize?: number;
    colorPrimary: string;
    sneakerId: string;
}
export const BtnCustom = ({chooseSize, colorPrimary, sneakerId}: IBtnCustom) => {

    const router = useRouter();
    const push = ()=>{
        if(!!chooseSize) router.push(`/custom/${chooseSize}/${colorPrimary}/${sneakerId}`);
        else ToastSave({ type: 'error', message: 'Please select a size to display in your shop' });
    }
    return (
        <Button variant={"secondary"} className="p-6" onClick={push}>
            <BiEdit className="!size-6" /> <span>Customization</span>
        </Button>
    )
}
