import React, {SelectHTMLAttributes, DetailedHTMLProps, ChangeEvent} from 'react';
import s from './SuperSelect.module.css';

type DefaultSelectPropsType = DetailedHTMLProps<SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>

type SuperSelectPropsType = DefaultSelectPropsType & {
    name?:string
    options?: any[]
    onChangeOption?: (option: any) => void
    onChange?:(e:ChangeEvent<HTMLSelectElement>) => void
}

const SuperSelect: React.FC<SuperSelectPropsType> = (
    {
        name,
        options,
        onChange, onChangeOption,
        ...restProps
    }
) => {
    const mappedOptions: any[] = options ? options.map( (o,i:number) =>
    <option key={name + '-' + i} value={o}>{o}</option>) : [];

    const onChangeCallback = (e: ChangeEvent<HTMLSelectElement>) => {
        if(onChange) onChange(e);
        if(onChangeOption) onChangeOption(e.currentTarget.value);
    }

    return (
        <select onChange={onChangeCallback} {...restProps}>
            {mappedOptions}
        </select>
    )
}

export default SuperSelect
