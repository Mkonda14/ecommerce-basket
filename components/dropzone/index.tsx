"use client";

import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';


interface DropzoneProps {
    value: string;
    onChange: (value: string) => void;
}

export const Dropzone: React.FC<DropzoneProps> = ({ onChange }) => {
    const onDrop = useCallback((acceptedFiles: File[]) => {
        const reader = new FileReader();
        reader.onload = () => {
            const fileContent = reader.result as string;
            onChange(fileContent);
            console.log(acceptedFiles.map(file => console.log(file.name)))
        };
        reader.readAsText(acceptedFiles[0]);
    }, [onChange]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    return (
        <div
            {...getRootProps()}
            className={`p-6 border-2 border-dashed rounded-md transition-colors duration-300 ${
                isDragActive ? 'border-blue-500 bg-blue-100' : 'border-gray-300 bg-gray-50'
            }`}
        >
            <input {...getInputProps()} />
            <p className="text-center text-gray-500">
                {isDragActive ? 'Déposez les fichiers ici...' : 'Glissez-déposez des fichiers ici, ou cliquez pour sélectionner des fichiers'}
            </p>
        </div>
    );
};
