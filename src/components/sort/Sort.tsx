import React, {FC, useState} from 'react';

type SortPacksProps = {
    sortCallback: (sortMethod: string) => void
    sortMethod?: string
    name: string
}

export const Sort: FC<SortPacksProps> = ({name, sortCallback, sortMethod, children}) => {
    const [sortToggle, setSortToggle] = useState(false)
    const [isActive, setIsActive] = useState(false)

    const onSortHandler = (e: any) => {
        setSortToggle(!sortToggle)
        setIsActive(true)
        sortCallback(`${Number(sortToggle)}${name}`)
    }
    return (
        <div onClick={onSortHandler} title={name}>
            {children}
        </div>
    )
}