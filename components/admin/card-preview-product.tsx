"use client"

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { MdOutlineZoomInMap } from "react-icons/md"; 

import { CardProduct, CardProductProps } from "../card-product";


export const CardPreviewProduct = ({...props}: CardProductProps) => {

    return (
        <Card className="h-[520px] p-4 space-y-4">
            <CardHeader className="p-0">
                <div className="w-full flex justify-between items-center text-left">
                    <div className="flex gap-x-4">
                        <div className="h-8 w-2 bg-cyan-400"></div>
                        <div className="">
                            <CardTitle>Preview</CardTitle>
                            <CardDescription>représentation product</CardDescription>
                        </div>
                    </div>
                    <div className=""> <MdOutlineZoomInMap className="w-6 h-6" /> </div>
                </div>
            </CardHeader>
            <CardContent className="h-[400px] p-0 flex justify-center">
               <CardProduct {...props} />
            </CardContent>
        </Card>
        
    )
}
