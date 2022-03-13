
import React from "react";

type PropsType = {
    title: string
    setShow: (show: boolean) => void
    left: number
    top: number
}

export const Modal: React.FC<PropsType> = ({setShow, left, top, children, title}) => {

    const hideWindow = () => setShow(false);

    return (
        <>
            <div onClick={hideWindow}/>
            <div style={{left: `${left}%`, top: `${top}%`}}>
                <div >{title}</div>
                {children}
            </div>
        </>
    );
}