"use client";

import React, { useCallback, useState, useTransition } from 'react';

import { useDropzone } from 'react-dropzone';
import { BsUpload } from "react-icons/bs"; 
import { Typographie } from '../typographie';
import { ItemFile } from './item-file';

import { BsQuestionCircle } from "react-icons/bs"; 
import { Button } from '../ui/button';
import { Upload } from '@/actions/Upload';

interface DropzoneProps {
    onChange: (value: any[]) => void;
    className?: string;
}

export const Dropzone: React.FC<DropzoneProps> = ({ onChange, className }) => {

    const [style, setStyle] = useState<string | undefined>(className)
    const [files, setFiles] = useState<File[]>([])

    const onUpload = () => {
        if(files.length)
        {
            const resultats = files.map(file => file.name)
            onChange(files);
        }        
    }

    const Clear = () => {
        setFiles([]);
    }

    const onDelete = (name: string) =>{
        setFiles((files)=> files.filter((file) => file.name !== name))
    }

    const onDrop = useCallback((acceptedFiles: File[]) => {
        if(acceptedFiles?.length){
            setFiles((previousFiles)=>[
                ...previousFiles,
                ...acceptedFiles.map(file => 
                    Object.assign(file, { preview: URL.createObjectURL(file)})
                )
            ])
        }
    }, [onChange]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
        onDrop,
        accept: {
            'image/*': []
        },
        maxSize: 1024 * 1000
     });

    if(!style){
        setStyle('border-2 border-dashed min-h-[10rem] rounded-md transition-colors duration-300');
    }

    return (
        <section className="space-y-6">
            <div
                {...getRootProps({
                    className: style
                })}
            >
                <input {...getInputProps()} />
                <div className="min-h-[10rem] w-full flex flex-col gap-y-6 justify-center items-center">
                    <BsUpload />
                    <Typographie component="p" variant='p'>
                        Drag & Drop or <span className='text-blue-600'>Choose file</span> to upload
                    </Typographie>
                    <Typographie component="p" variant='p' size="sm" className='text-slate-400'>PNG or JPEG</Typographie>
                </div>
            </div>

            <div className="space-y-4">
                {files.map(file =>(
                    <ItemFile name={file.name} size={file.size} time={"2"} progression={33} onDelete={onDelete} />
                ))}
            </div>

            <div className="flex items-center justify-between">
                <Typographie component="p" variant='h3' className='flex items-center gap-x-4'>
                    <BsQuestionCircle />
                    <span>Help Center</span>
                </Typographie>
                <div className="space-x-4">
                    <Button variant="outline" type='submit' >Clear</Button>
                    <Button  type='button' onClick={onUpload}>Import</Button>
                </div>
            </div>
        </section>
    );
};
