import classes from "./Modal.module.css";
import React, {useRef} from "react";
import SuperButton from "../SuperButton/SuperButton";
import {useOnClickOutside} from "../../hooks/useOnClickOutside";

export const DeleteModal = (
    {show, onClose, onConfirm, elementName,typeElement}: QuestionModalType
) => {
    const ref: any = useRef();
    useOnClickOutside(ref, onClose);

    return (
        <>
            {show &&
                <div className={classes.modal}>
                    <div className={classes.container} ref={ref}>
                        <h3 className={classes.modalTitle}>Delete {typeElement} {elementName}</h3>
                        <div className={classes.modalText}>
                            Do you really want to remove {elementName}?
                            All cards will be excluded from this course.
                        </div>
                        <div className={classes.buttonsWrapper}>
                            <SuperButton className={classes.modalCloseButton} onClick={onConfirm}>Delete</SuperButton>
                            <SuperButton className={classes.modalButton} onClick={onClose}>Close</SuperButton>
                        </div>
                    </div>
                </div>}
        </>
    )
}

type QuestionModalType = {
    typeElement: 'pack' | 'card'
    show: boolean
    elementName: string
    onConfirm: () => void
    onClose: () => void
}