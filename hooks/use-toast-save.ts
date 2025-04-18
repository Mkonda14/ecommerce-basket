"use client"

import { toast } from "./use-toast";

type ToastSaveType = {
    type: string,
    message: string,
}

export const ToastSave = (data: ToastSaveType)=>{
    toast({
        variant: data.type === 'error' ? "destructive" : "default",
        title: data.type === 'error' ? "Error" : "Success",
        description: data.message,
    })
}