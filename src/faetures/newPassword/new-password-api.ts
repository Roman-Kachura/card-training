import axios, {AxiosResponse} from "axios";
import {DataNewPasswordType, ResponseNewPasswordType} from "./new-password-reducer";


const instance3 = axios.create({
    baseURL: "https://neko-back.herokuapp.com/2.0",
    // baseURL: "http://localhost:7542/2.0/",
    withCredentials: true
});

export const newPasswordAPI = {
    createRequestRecoveryPassword(data: DataNewPasswordType){
        return instance3.post<DataNewPasswordType, AxiosResponse<ResponseNewPasswordType>>("auth/set-new-password", data);
    }
};