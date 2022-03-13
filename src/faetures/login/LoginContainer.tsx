import {Login} from "./Login";
import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../app/store";
import {Navigate} from "react-router-dom";
import {RequestStatusType, setAppErrorAC} from "../../app/app-reducer";
import {loginTC, logoutTC, setLoginErrorAC} from "../../api/AuthReducer";
import {PATH} from "../../routes/routes";
import {Spin} from "antd";

export const LoginContainer = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('nya-admin@nya.nya');
    const [emailError, setEmailError] = useState('');
    const [password, setPassword] = useState('1qazxcvBG');
    const [passError, setPassError] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const isLoggedIn: boolean = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn);
    const error: string = useSelector<AppRootStateType, string>(state => state.auth.error);
    const status: RequestStatusType = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status);

    const onChangeEmail = (value: string) => {
        setEmail(value);
        setEmailError('');
        dispatch(setLoginErrorAC(''));
        dispatch(setAppErrorAC(''));
    }

    const onChangePassword = (value: string) => {
        setPassword(value);
        setPassError('');
        dispatch(setLoginErrorAC(''));
        dispatch(setAppErrorAC(''));
    }

    const onChangeRememberMe = (value: boolean) => {
        setRememberMe(value);
    }

    const login = () => {
        const validation = new RegExp(/^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/);
        if (!validation.test(email)){
            dispatch(setAppErrorAC('Email is not correct!'));
            setEmailError('Email is not correct!');
        }
        if (password.length < 8){
            dispatch(setAppErrorAC('Password must be more than 7 characters...'));
            setPassError('Password must be more than 7 characters...');
        }
        if (validation.test(email) && password.length > 7) {
            dispatch(loginTC(email, password, rememberMe));
            setEmail('');
            setPassword('');
            setRememberMe(false);
        }

        if(!validation.test(email) && password.length < 8){
            dispatch(setAppErrorAC('Please check your email and password'));
            setEmailError('Email is not correct!');
            setPassError('Password must be more than 7 characters...');
        }
    }

    if (isLoggedIn) {
        return <Navigate to={PATH.PROFILE}/>
    }

    return (
        <>
            {
                status === 'loading'
                    ? <Spin size={'large'} tip="Loading..."/>
                    : <Login
                    email={email}
                    password={password}
                    rememberMe={rememberMe}
                    onChangeEmail={onChangeEmail}
                    onChangePassword={onChangePassword}
                    onChangeRememberMe={onChangeRememberMe}
                    login={login}
                    error={error}
                    emailError={emailError}
                    passError={passError}
                    status={status}
                />
            }
        </>

    )
}