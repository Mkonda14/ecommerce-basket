"use client"

import { ToastSave } from "@/hooks/use-toast-save";
import { useQueryClient } from "@tanstack/react-query";


import { FiAlertTriangle } from "react-icons/fi"; 
import { RiDeleteBin5Line } from "react-icons/ri"; 

import { Button } from "@/components/ui/button"
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from "@/components/ui/alert-dialog"
import { useState } from "react";

import { 
    deleteCategorySneaker,
    deleteCategoryTheme,
    deleteTagSneaker,
    deleteTheme 
} from "@/actions/category-attribut/delete"

import { deleteSneaker } from "@/actions/product/delete";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { deleteCategoryGraffiti } from "@/actions/graffiti/category/delete";
import { deleteGraffiti } from "@/actions/graffiti/delete";

interface IBtnDelete{
    id: string,
    queryKey: string,
}

export const DropdownMenuItemDelete = ({id, queryKey}: IBtnDelete) => {

    const queryClient = useQueryClient();
    const [open, setOpen] = useState<boolean>(false);
    const [isLoading, setLoading] = useState<boolean>(false);

    const router = useRouter();

    const handleSubmit = async ()=>{

        let values = null;
        setLoading(true);

        switch (queryKey) {
            case "category-sneakers":
                values = await deleteCategorySneaker({id});
                break;
            case "tag-sneakers":
                values = await deleteTagSneaker({id});
                break;
            case "category-themes":
                values = await deleteCategoryTheme({id});
                break;
            case "themes":
                values = await deleteTheme({id});
                break;
            case "sneakers":
                values = await deleteSneaker({id});
                break;
            case "category-graffitis":
                values = await deleteCategoryGraffiti({id});
                break;
            case "graffitis":
                values = await deleteGraffiti({id});
                break;
        }
        
        if(values?.validationErrors){
            ToastSave({
                type: 'error',
                message: `${values.validationErrors}`
            })            
            return;
        }

        if(values?.serverError){
            ToastSave({
                type: 'error',
                message: `${values.serverError?.serverError}`
            })            
            return;
        }

        ToastSave({
            type: 'success',
            message: `${values?.data?.message}`
        })
        setLoading(false)
        queryClient.invalidateQueries({queryKey: [queryKey]})
        router.refresh()
        setOpen(false)

    }

    return (
            <AlertDialog open={open} onOpenChange={setOpen}>
                <AlertDialogTrigger>
                    <DropdownMenuItem 
                        className="w-[130px] flex items-center gap-x-3 text-red-500"
                        onClick={(e)=> {
                            e.preventDefault();
                            setOpen(true)
                        }} 
                        >
                        <RiDeleteBin5Line className="size-4 mb-1" />
                        <span>Supprimer</span>
                    </DropdownMenuItem>
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-white">
                    <AlertDialogHeader>
                        <AlertDialogTitle className="flex items-center gap-x-2 mb-2">
                            <FiAlertTriangle className="size-6 text-orange-300" />
                            <span>Suppression</span>
                        </AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your
                        account and remove your data from our servers.
                    </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                    <AlertDialogCancel onClick={()=> setOpen(false)}>Cancel</AlertDialogCancel>
                    <Button 
                        variant={"destructive"}
                        disabled={isLoading}
                        onClick={()=> {
                            handleSubmit()
                        }}
                    >Confirmation</Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
    )
}
