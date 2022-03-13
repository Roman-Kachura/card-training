import axios from "axios";
import { ResponseGetPacksType } from "./search-pack-reducer";
import {ResponseGetCardsType} from "./search-reducer";


const instance = axios.create({
    // baseURL: "https://neko-back.herokuapp.com/2.0",
    baseURL: "http://localhost:7542/2.0/",
    withCredentials: true
});

export const searchAPI = {
    searchCards(question: string){
        return instance.get<ResponseGetCardsType>(`cards/card?cardAnswer=${question}`);
    },
    searchPacks(parkName: string) {
        return instance.get<ResponseGetPacksType>(`cards/pack?packName=${parkName}`);
    }
};