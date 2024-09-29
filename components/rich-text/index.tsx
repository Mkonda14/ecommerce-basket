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
                class: "min-h-[125px] p-2 border-input bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
            },
        },
        onUpdate({editor}){
            onChange(editor.getHTML());
        },
    })

    return (
        <div className="flex flex-col justify-stretch bg-slate-100 h-auto border rounded-lg overflow-hidden">
            <ToolBar editor={editor} />
            <EditorContent editor={editor} />
        </div>
    )
}
