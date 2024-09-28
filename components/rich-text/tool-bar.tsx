"use client"

import {type Editor} from "@tiptap/react";
import {
    Bold,
    Strikethrough,
    Italic,
    List,
    Heading2
} from "lucide-react";

import {Toggle} from "@/components/ui/toggle";

interface ToolBarProps{
    editor: Editor | null;
}

export const ToolBar = ({editor}: ToolBarProps) => {
    if(!editor) return null;

    return (
        <div className="space-x-2 border p-1 border-input bg-transparent bg-slate-300">
            <Toggle
                size={"sm"}
                pressed={editor.isActive("heading")}
                onPressedChange={()=>
                    editor.chain().focus().toggleHeading({level: 2}).run()
                }
            >
                <Heading2 />
            </Toggle>

            <Toggle
                size={"sm"}
                pressed={editor.isActive("bold")}
                onPressedChange={()=>
                    editor.chain().focus().toggleBold().run()
                }
            >
                <Bold />
            </Toggle>

            <Toggle
                size={"sm"}
                pressed={editor.isActive("italic")}
                onPressedChange={()=>
                    editor.chain().focus().toggleItalic().run()
                }
            >
                <Italic />
            </Toggle>

            <Toggle
                size={"sm"}
                pressed={editor.isActive("strike")}
                onPressedChange={()=>
                    editor.chain().focus().toggleStrike().run()
                }
            >
                <Strikethrough />
            </Toggle>
            
            <Toggle
                size={"sm"}
                pressed={editor.isActive("bulletList")}
                onPressedChange={()=>
                    editor.chain().focus().toggleBulletList().run()
                }
            >
                <List />
            </Toggle>

        </div>
    )
}
