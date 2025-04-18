"use client"

import { AiFillCheckCircle } from "react-icons/ai"; 
import { BsFillFileEarmarkRichtextFill } from "react-icons/bs"; 
import { Typographie } from "../typographie";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";
import { AiOutlineClose } from "react-icons/ai"; 

interface ItemFileProps{
    name: string;
    size: number;
    time: number;
    progression: number; 
    onDelete: (id: string) => void;
}

export const ItemFile = ({name, size, time, progression, onDelete}: ItemFileProps) => {

    const covertSize = (size: number) =>{
        return Math.round(size / 1024);
    }

    const timer = new Date(time).getTime();

    return (
        <article className="w-full space-y-2 p-4 hover:bg-slate-200 rounded-sm">
            <div className="flex items-center gap-x-4">
                <div className=""> <BsFillFileEarmarkRichtextFill className="h-10 w-8" /> </div>
                <div className="flex-grow">
                    <div className="flex items-center justify-between">
                        <Typographie component="p" variant="h3">{name}</Typographie>
                        {progression === 100 ? 
                            <AiFillCheckCircle className="size-6 text-emerald-500" /> :
                            <Button 
                                size={"icon"} 
                                disabled={progression !== 0}
                                variant={"outline"} 
                                className="border-none shadow-none" 
                                onClick={()=>{onDelete(name)}}>
                                <AiOutlineClose />
                            </Button>
                        }
                    </div>
                    <div className="flex items-center justify-between">
                        <Typographie component="p" variant="p" className="text-slate-400">
                            <span>{covertSize(size)} Kg</span> - <span>{timer} seconds left</span>
                        </Typographie>
                        <span className="px-2 text-slate-400">{Math.ceil(progression)}</span>
                    </div>
                </div>
            </div>
            <div className="">
                <Progress value={progression} />
            </div>
        </article>
  )
}
