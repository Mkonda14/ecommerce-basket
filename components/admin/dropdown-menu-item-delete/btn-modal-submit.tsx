"use client"

import { FiAlertTriangle } from "react-icons/fi"; 
import { RiDeleteBin5Line } from "react-icons/ri"; 

import { Button } from "@/components/ui/button"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useState } from "react";

export const BtnModalSubmit = () => {
    const [open, setOpen] = useState<boolean>(false)
    return (
        <>
        <li onClick={(e)=> {
            e.preventDefault();
            setOpen(true)}} className="w-full h-full flex items-center gap-x-4 border-none py-1">
            <RiDeleteBin5Line />
            <span>Supprimer</span>
        </li>
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogContent className="bg-white">
                <AlertDialogHeader>
                <AlertDialogTitle>
                    <FiAlertTriangle />
                    <span>Suppression</span>
                </AlertDialogTitle>
                <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete your
                    account and remove your data from our servers.
                </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                <AlertDialogCancel onClick={()=> setOpen(false)}>Cancel</AlertDialogCancel>
                <AlertDialogAction asChild>
                    <Button 
                        variant={"destructive"}
                        type="submit"
                        onClick={()=> setOpen(false)}
                    >Confirmation</Button>
                </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
        </>
    )
}
