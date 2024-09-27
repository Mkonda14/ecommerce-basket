"use client"


import { useState } from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function ThemeToggle() {
  const { setTheme } = useTheme()
  const [isLight, setIsLight] = useState<boolean>(true)

  const onToggle = (theme: string) => {
        setTheme(theme)
        switch (theme) {
            case "dark":
                setIsLight(false)
                break;   
            default:
                setIsLight(true)
                break;
        }
  }

  return (
    <div className="w-full flex justify-between items-center gap-x-2 bg-slate-100 p-1 rounded-full">
        <Button variant="outline" onClick={()=> onToggle("light")} className={cn("w-1/2 border-none h-8 rounded-full py-0 text-sm space-x-2", isLight ? "bg-white" : "bg-transparent shadow-none")}>
          <Sun />
          <span className="">Light</span>
        </Button>
        <Button variant="outline" onClick={()=> onToggle("dark")} className={cn("w-1/2 border-none h-8 rounded-full py-0 text-sm space-x-2", !isLight ? "bg-white" : "bg-transparent shadow-none")}>
          <Moon />
          <span className="">Dark</span>
        </Button>

    </div>
  )
}
