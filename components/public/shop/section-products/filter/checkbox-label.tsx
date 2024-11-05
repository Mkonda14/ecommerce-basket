

import { Checkbox } from '@/components/ui/checkbox'
import { Dispatch, SetStateAction } from 'react';

interface CheckboxLabelProps{
    label: string;
    value: string;
    onChange: Dispatch<SetStateAction<string[]>>;
    values?: string[];
}

export const CheckboxLabel = ({label, value, onChange, values=[]}: CheckboxLabelProps) => {
    return (
        <label htmlFor={value} className='flex items-center gap-x-4 text-base cursor-pointer'>
            <Checkbox
                checked={values.includes(value)}
                id={value}
                onCheckedChange={(checked) => {
                    return checked
                    ? onChange([...values, value])  
                    : onChange(
                        values.filter(
                            (val) => val !== value
                        )
                    )
                }}
            />
            <span>{label}</span>
        </label>

    )
}
