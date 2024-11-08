

import { Checkbox } from '@/components/ui/checkbox'
import { Dispatch, SetStateAction } from 'react';

interface CheckboxLabelProps{
    label: string;
    value: string;
    onChange: Dispatch<SetStateAction<string[]>>;
    values?: string[];
    updated: (value: string[]) => void;
}

export const CheckboxLabel = ({label, value, onChange, values=[], updated}: CheckboxLabelProps) => {
    return (
        <label htmlFor={value} className='flex items-center gap-x-4 text-base cursor-pointer'>
            <Checkbox
                checked={values.includes(value)}
                id={value}
                onCheckedChange={(checked) => {
                    return checked
                    ? onChange((state)=> {
                        const values = [...state, value];
                        updated(values);
                        return values;
                    } )  
                    : onChange((state)=> {
                        const values = state.filter((val) => val !== value);
                        updated(values);
                        return values;
                    })
                }}
            />
            <span>{label}</span>
        </label>

    )
}
