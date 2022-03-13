import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import SuperInputText from "../../components/SuperInputText/SuperInputText";
import SuperButton from "../../components/SuperButton/SuperButton";
import {Navigate, useParams} from "react-router-dom";
import {AppRootStateType} from "../../app/store";
import {createNewPasswordTC} from "./new-password-reducer";
import classes from "../../style/Auth.module.css";
import {Spin} from "antd";

export const NewPassword = () => {
    const dispatch = useDispatch();
    const [password, setPassword] = useState<string>("");
    const {token} = useParams<"token">();
    const status = useSelector<AppRootStateType, string>((state) => state.app.status);
    const error = useSelector<AppRootStateType, string>((state) => state.newPassword.error);
    const isChangedPassword = useSelector<AppRootStateType, boolean>(state => state.newPassword.isChangedPassword);

    const changePassword = (value: string) => {
        setPassword(value);
    };

    const createNewPassword = () => {
        dispatch(createNewPasswordTC({password, token}));
    };

    if (isChangedPassword) {
        return <Navigate to="/login"/>
    }

    if(status === 'loading'){
        return <Spin size={'large'} tip="Loading..."/>
    }


    return (
        <div className={`${classes.auth} ${classes.newPassword}`}>
            <h2 className={classes.authTitle}>IT-INCUBATOR</h2>
            <h3 className={classes.authSubtitle}>Create new password</h3>
            <div className={classes.authItem}>
                <div className={classes.authLabel}>Password</div>
                <SuperInputText
                    className={!error ? classes.authFields : `${classes.authFields} ${classes.authFieldsError}`}
                    onChangeText={changePassword}
                    type='text' name='email'
                    placeholder='Enter email'
                    id="password"
                    error={error}

                />
            </div>
            <div className={classes.linkBlock}>
                <div style={{textAlign:'center'}}>Create new password and we will send you further instructions to email</div>
                <SuperButton
                    type="submit"
                    disabled={status === "loading"}
                    className={classes.authButton}
                    onClick={createNewPassword}
                >
                    Create new password
                </SuperButton>
            </div>
        </div>
    )
};

