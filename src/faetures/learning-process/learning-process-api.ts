import axios, {AxiosResponse} from "axios";
import {DataLearningProcessType, ResponseLearningProcessType} from "./learrning-process-reducer";



const instance = axios.create({
    baseURL: "https://neko-back.herokuapp.com/2.0",
    // baseURL: "http://localhost:7542/2.0/",
    withCredentials: true
});

export const learningProcessAPI = {
    setGrade(data: DataLearningProcessType){
        return instance.put<DataLearningProcessType, AxiosResponse<ResponseLearningProcessType>>("cards/grade", data);
    }
};