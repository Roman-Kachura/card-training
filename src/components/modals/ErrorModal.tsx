import classes from "./Modal.module.css";
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {setAppErrorAC} from "../../app/app-reducer";

export const ErrorModal = (
    {error}: ErrorModalPropsType
) => {
    const [show, setShow] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');
    const finalClassName = show ? `${classes.error} ${classes.show}` : `${classes.error}`;
    const dispatch = useDispatch();

    const onClickHandler = () => {
        setMessage('');
        dispatch(setAppErrorAC(''));
    }

    useEffect(() => {
        setShow(!!message);
    }, [message])

    useEffect(() => {
        setMessage(error);
    }, [error]);

    useEffect(() => {
        let id = setTimeout(() => {
            setShow(false);
            dispatch(setAppErrorAC(''));
            clearTimeout(id)
        }, 10000)
    }, [show]);

    return (
        <div className={finalClassName}>
            <div className={classes.errorMessage}>
                {message}
            </div>
            <button onClick={onClickHandler} className={classes.errorButton}>&#215;</button>
        </div>
    )
}

type ErrorModalPropsType = {
    error: string
}