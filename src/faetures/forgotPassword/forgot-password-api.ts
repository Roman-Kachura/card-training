import axios, {AxiosResponse} from "axios";
import {DataForgotPasswordType, ResponseForgotPasswordType} from "./forgot-password-reducer";



const instance2 = axios.create({
    baseURL: "https://neko-back.herokuapp.com/2.0/",
    // baseURL: "http://localhost:7542/2.0/",
    withCredentials: true
});

export const forgotPasswordAPI = {
    createForgotPasswordRequest(data: DataForgotPasswordType){
        return instance2.post<DataForgotPasswordType, AxiosResponse<ResponseForgotPasswordType>>("auth/forgot", data);
    }
};