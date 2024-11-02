"use client";

import React, { useCallback, useState, useTransition } from 'react';

import { useDropzone } from 'react-dropzone';
import { BsUpload } from "react-icons/bs"; 
import { Typographie } from '../typographie';
import { ItemFile } from './item-file';

import { BsQuestionCircle } from "react-icons/bs"; 
import { Button } from '../ui/button';
import { getSignature } from '@/actions/cloudinary/upload';
import { LoaderSpin } from '../loader-spin';

interface DropzoneProps {
    onChange: (value: { secure_url: string, public_id: string } | { secure_url: string, public_id: string }[]) => void;
    className?: string;
    folder?: string;
    maxFiles?: number;

}

export const Dropzone: React.FC<DropzoneProps> = ({ onChange, className, maxFiles=1, folder="product" }) => {

    const [style, setStyle] = useState<string | undefined>(className)
    const [files, setFiles] = useState<File[]>([])
    const [isLoading, startTransition] = useTransition();

    const onClear = () => {
        setFiles([]);
        onChange([]);
    }

    const onImport = async (): Promise<undefined> => {
        const imgs = [];

        for (let idx = 0; idx < files.length; idx++) {
            const file = files[idx];

            if (file) {

                const {timestamp, signature} = await getSignature(folder);
    
                const formData = new FormData();
    
                formData.append('file', file);
                formData.append('api_key', process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY as string);
                formData.append('signature', signature);
                formData.append('timestamp', timestamp.toString());
                formData.append('folder', folder);
    
                const endpoint = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_URL as string;
        
                try {
                    const response = await fetch(endpoint, {
                        method: 'POST',
                        body: formData,
                    });
    
                    console.log(response);
                    
        
                    if (!response.ok) {
                        console.log('Network response was not ok', response);
                        return;
                    }
        
                    const data = await response.json();
                    console.log(data);
        
                    if (data.secure_url) {
                        imgs.push({
                            secure_url: data.secure_url,
                            public_id: data.public_id
                        });
                        console.log('yes upload successful');
                    } else {
                        console.log('No secure_url found in response data');
                    }
                } catch (error) {
                    console.error('Error during file upload:', error);
                }
            }
        }

        if(folder === "theme")
        {
            onChange(imgs[0]);  
            return;        
        }        
        onChange(imgs);          
    }
    

    const onDelete = (name: string) =>{
        setFiles((files)=> files.filter((file) => file.name !== name));
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
    }, []);

    const { getRootProps, getInputProps } = useDropzone({ 
        onDrop,
        accept: {
            'image/*': []
        },
        maxSize: 1024 * 1000,
        maxFiles: maxFiles
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
                    <ItemFile key={file.name} name={file.name} size={file.size} time={"2"} progression={33} onDelete={onDelete} />
                ))}
            </div>

            <div className="flex items-center justify-between">
                <Typographie component="p" variant='h3' className='flex items-center gap-x-4'>
                    <BsQuestionCircle />
                    <span>Help Center</span>
                </Typographie>
                <div className="space-x-4">
                    <Button variant="outline" type='button' onClick={onClear} >Clear</Button>
                    <Button disabled={isLoading} type='button' onClick={()=>{
                        startTransition(async () => {
                            await onImport();
                        });
                    }} > 
                    {isLoading ? <LoaderSpin /> : <span>Import</span> }                    
                    </Button>
                </div>
            </div>
        </section>
    );
};
