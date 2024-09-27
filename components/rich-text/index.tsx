"use client"

import {useEditor, EditorContent} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { ToolBar } from "./tool-bar";

interface RichTextProps{
    value: string;
    onChange: (value: string) => void;
}

export default function RichText ({value, onChange}: RichTextProps){

    const editor = useEditor({
        extensions: [StarterKit.configure()],
        content: value,
        editorProps: {
            attributes: {
                class: "rounded-md border min-h-[150px] border-input bg-back-200 disabled:cursor-not-allowed disabled:opacity-50"
            },
        },
        onUpdate({editor}){
            onChange(editor.getHTML());
            console.log(editor.getHTML());
        },
    })

    return (
        <div className="flex flex-col justify-stretch min-h-[250px]">
            <ToolBar editor={editor} />
            <EditorContent editor={editor} />
        </div>
    )
}
