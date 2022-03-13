import React from "react";
import {NavLink} from "react-router-dom";
import SuperInputText from "../../components/SuperInputText/SuperInputText";
import SuperCheckbox from "../../components/SuperCheckbox/SuperCheckbox";
import SuperButton from "../../components/SuperButton/SuperButton";
import {RequestStatusType} from "../../app/app-reducer";
import classes from "../../style/Auth.module.css";
import {PATH}  from "../../routes/routes";

export const Login: React.FC<LoginPropsType> = (
    {
        email,
        password,
        rememberMe,
        onChangeEmail,
        onChangePassword,
        onChangeRememberMe,
        login,
        error,
        emailError,
        passError,
        status
    }
) => {
    return (
        <div className={classes.auth}>
            <h2 className={classes.authTitle}>IT-INCUBATOR</h2>
            <h3 className={classes.authSubtitle}>Sing In</h3>
            <div>
                {error && <div className={classes.error}>{error}</div>}
                <div className={classes.authItem}>
                    <div className={classes.authLabel}>Email</div>
                    <SuperInputText
                        className={!emailError ? classes.authFields : `${classes.authFields} ${classes.authFieldsError}`}
                        onChangeText={onChangeEmail}
                        type='text' name='email'
                        placeholder='Email'
                        value={email}
                        error={emailError}

                    />
                </div>
                <div className={classes.authItem}>
                    <div className={classes.authLabel}>Password</div>
                    <SuperInputText
                        className={!passError ? classes.authFields : `${classes.authFields} ${classes.authFieldsError}`}
                        onChangeText={onChangePassword}
                        type='password' name='password'
                        placeholder='Password'
                        value={password}
                        error={passError}
                    />
                </div>

                <SuperCheckbox className={classes.authCheckBox} checked={rememberMe}
                               onChangeChecked={onChangeRememberMe}>Remember Me</SuperCheckbox>

                <div className={classes.forgotLink}>
                    <NavLink to={`${PATH.FORGOT_PASSWORD}`}>Forgot password?</NavLink>
                </div>

                <SuperButton className={classes.authButton} onClick={login}>SingIn</SuperButton>


                <div className={classes.linkBlock}>
                    <div>Don't have an account?</div>
                    <NavLink className={classes.authLink} to={'/registration'}>Sing Up</NavLink>
                </div>
            </div>
        </div>
    )
}

type LoginPropsType = {
    emailError: string
    passError: string
    error: string
    email: string
    password: string
    rememberMe: boolean
    onChangeEmail: (value: string) => void
    onChangePassword: (value: string) => void
    onChangeRememberMe: (value: boolean) => void
    login: () => void
    status: RequestStatusType
}