import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import SuperInputText from "../../components/SuperInputText/SuperInputText";
import SuperButton from "../../components/SuperButton/SuperButton";
import {NavLink} from "react-router-dom";
import {createForgotPasswordRequestTC} from "./forgot-password-reducer";
import {AppRootStateType} from "../../app/store";
import classes from "../../style/Auth.module.css";
import {Spin} from "antd";

export const ForgotPassword = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState<string>("");
    const error = useSelector<AppRootStateType, string>((state) => state.forgotPassword.error);
    const status = useSelector<AppRootStateType, string>((state) => state.forgotPassword.status);
    const isCreateForgotPasswordRequest = useSelector<AppRootStateType, boolean>(state => state.newPassword.isChangedPassword);

    const changeEmail = (value: string) => {
        setEmail(value);
    };

    const message = `
        <div style="background-color: #f4ffd4; padding: 15px">
            password recovery link: 
            <a href="http://localhost:3000/create-new-password/$token$" style="color: #913ab7;">link</a>
        </div>
    `;

    const sendDataForPasswordRecovery = () => {
        dispatch(createForgotPasswordRequestTC({email, message}))
    };

    if(status === 'loading'){
        return <Spin size={'large'} tip="Loading..."/>
    }


    return (
        <div className={`${classes.auth} ${classes.forgotPassword}`}>
            <h2 className={classes.authTitle}>IT-INCUBATOR</h2>
            <h3 className={classes.authSubtitle}>Forgot your password?</h3>
            <div className={classes.authItem}>
                <div className={classes.authLabel}>Email</div>
                <SuperInputText
                    id="email"
                    className={!error ? classes.authFields : `${classes.authFields} ${classes.authFieldsError}`}
                    onChangeText={changeEmail}
                    type='text' name='email'
                    placeholder='Enter email'
                    value={email}
                    error={error}

                />
            </div>
            {isCreateForgotPasswordRequest && <div style={{color: "green"}}>Success</div>}

            <SuperButton
                className={classes.authButton}
                onClick={sendDataForPasswordRecovery}
                disabled={status === "loading"}
                type="submit"
            >Send Instructions
            </SuperButton>

            <div className={classes.linkBlock}>
                <div>Did you remember your password?</div>
                <NavLink className={classes.authLink} to={'/login'}>Try logging in</NavLink>
            </div>
        </div>
    )
};

