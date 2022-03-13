import React, {useEffect, useState} from "react";
import {Link, Navigate, NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {registerTC} from "./reg-reducer";
import SuperInputText from "../../components/SuperInputText/SuperInputText";
import { AppRootStateType } from "../../app/store";
import {PATH} from "../../routes/routes";
import classes from "../../style/Auth.module.css";
import {RequestStatusType} from "../../app/app-reducer";
import {Spin} from "antd";


export const Registration = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [secPass, setSecPass] = useState('');
    const [emailErr, setEmailErr] = useState('');
    const [passErr, setPassErr] = useState('');
    const isLoggedIn = useSelector<AppRootStateType,boolean>(state => state.auth.isLoggedIn);
    const status: RequestStatusType = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status);


    const dispatch = useDispatch();
    //@ts-ignore
    const toggleReg: boolean = useSelector<AppRootStateType, boolean>(state => state.reg.toggleRegistration);

    useEffect(() => {
        if(toggleReg){
            setEmail('');
            setPassword('');
            setSecPass('');
        }
    }, [toggleReg])


    const setEmailHandler = (value: string) => setEmail(value);
    const setPasswordHandler = (value: string) => setPassword(value);
    const setSecPassHandler = (value: string) => setSecPass(value);

    const registrationSubmit =  () => {
        dispatch(registerTC({email, password}));
    }

    const submitBtnHandler = async () => {
        setPassErr('');
        setEmailErr('');
        const validation = new RegExp(/^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/);
        if (!validation.test(email)) {
            setEmailErr('Email is not correct!');
        } else if (password.length < 8) {
            setPassErr('Passwords must be minimum 7 characters !!!!');
        } else if (password !== secPass) {
            setPassErr('Passwords must be the same!!!!');
        } else if(emailErr === '' && passErr === ''){
            registrationSubmit();
        }
    };

    if (isLoggedIn) {
        return <Navigate to={PATH.PROFILE}/>
    }

    if(status === 'loading'){
        return <Spin size={'large'} tip="Loading..."/>
    }
    return <div className={classes.auth}>
        <h2 className={classes.authTitle}>IT-INCUBATOR</h2>
        <h3 className={classes.authSubtitle}>Sing Up</h3>
        <div>
            <div className={classes.authItem}>
                <div className={classes.authLabel}>Email</div>
                <SuperInputText
                    className={!emailErr ? classes.authFields : `${classes.authFields} ${classes.authFieldsError}`}
                    onChangeText={setEmailHandler}
                    type='email' name='email'
                    placeholder='Email'
                    value={email}
                    error={emailErr}/>
            </div>
            <div className={classes.authItem}>
                <div className={classes.authLabel}>Password</div>
                <SuperInputText
                    className={!passErr ? classes.authFields : `${classes.authFields} ${classes.authFieldsError}`}
                    onChangeText={setPasswordHandler}
                    type='password' name='password'
                    placeholder='Password'
                    value={password}
                    error={passErr}/>
            </div>
            <div className={classes.authItem}>
                <div className={classes.authLabel}>Confirm password</div>
                <SuperInputText
                    className={classes.authFields}
                    onChangeText={setSecPassHandler}
                    type='password' name='password'
                    placeholder='Repeat your password'
                    value={secPass}
                    error={passErr}/>
            </div>
            <button className={classes.authButton}
                    onClick={() => submitBtnHandler()}>Sign
                Up
            </button>
            <div className={classes.linkBlock}>
                <div>Do you have an account?</div>
                <NavLink className={classes.authLink} to={'/login'}>Sing In</NavLink>
            </div>
            {toggleReg && <div>You have been successfully registered =^_^=</div>}
        </div>
    </div>
}