import React, {ChangeEvent, InputHTMLAttributes, DetailedHTMLProps} from 'react'
import styles from './SuperRadio.module.css'

type DefaultRadioPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

type SuperRadioPropsType = DefaultRadioPropsType & {
    options?: any[]
    onChangeOption?: (option: any) => void
}

const SuperRadio: React.FC<SuperRadioPropsType> = (
    {
        type, name,
        options, value,
        onChange, onChangeOption,
        ...restProps
    }
) => {
    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
        // onChange, onChangeOption
        onChange && onChange(e);
        onChangeOption && onChangeOption(e.currentTarget.value);
    }

    const mappedOptions: any[] = options ? options.map((o, i) => ( // map options with key
        
        <label key={name + '-' + i} className={styles.label}>
            <input
                type={'radio'}
                // name, checked, value, onChange
                name={name}
                checked={o === value}
                value={o}
                onChange={onChangeCallback}
                {...restProps}
                className={styles.radiobox}
            />
            <span className={styles.fakeRadiobox}></span>
            {o}
        </label>
    )) : []

    return (
        <>
            {mappedOptions}
        </>
    )
}

export default SuperRadio
