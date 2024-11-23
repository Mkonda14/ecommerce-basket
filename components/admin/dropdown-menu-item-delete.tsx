"use client"

import { ToastSave } from "@/hooks/use-toast-save";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import { BtnModalSubmit } from "./dropdown-menu-item-delete/btn-modal-submit";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { Form } from "../ui/form";
import { useForm } from "react-hook-form";

type TValues = Promise<{
    data: {message: string | undefined} | undefined;
    serverError: string | undefined;
    validationErrors: {
        _errors?: string[] | undefined;
        id?: {
            _errors?: string[] | undefined;
        } | undefined;
    } | undefined;
    queryKey: string[];
}>

interface IBtnDelete{
    onDelete: ()=>TValues;
}

export const DropdownMenuItemDelete = ({onDelete}: IBtnDelete) => {

    const router = useRouter();
    const queryClient = useQueryClient();

    const form = useForm();

    const handleSubmit = async ()=>{
        console.log("(((((((((((((((((((deleting");

        const values = await onDelete();
        if(values?.validationErrors) {
            ToastSave({
              type: 'error',
              message: `There was an error deleting the object`
            })
            return;
        }

        if(values?.serverError) {
            ToastSave({
              type: 'error',
              message: `${values?.serverError}`
            })
            return;
        }

        ToastSave({
            type: 'success',
            message: `${values?.data?.message}`
        })

        console.log("(((((((((((((((((((deleting");
        

        router.refresh();
        queryClient.invalidateQueries({queryKey: values.queryKey});
    }

    return (
        <DropdownMenuItem asChild>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)}>
                    <BtnModalSubmit/>
                </form>
            </Form>
        </DropdownMenuItem>
    )
}
