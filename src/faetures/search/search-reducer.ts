import { Dispatch } from "redux";
import {searchAPI} from "./search-api";
import {setAppErrorAC} from "../../app/app-reducer";

let initialState = {
    cards: [
        {
            answer: "",
            question: "",
            cardsPack_id: "",
            grade: 0,
            rating: 0,
            shots: 0,
            type: "",
            user_id: "",
            created: "",
            updated: "",
            __v: 0,
            _id: ""
        },
    ] as CardType[],
    cardsTotalCount: 0,
    maxGrade: 0,
    minGrade: 0,
    page: 0,
    pageCount: 0,
    packUserId: ""
};

export type InitialStateType = typeof initialState;

export const searchReducer = (state: InitialStateType = initialState, action: SearchReducerActionsType): InitialStateType => {
    switch (action.type) {
        case "SET-FIND-CARDS":
            return {...state, cards: action.cards};
        default:
            return state;
    }
};

//actions
export const setFoundCardsAC = (cards: CardType[]) => ({type: "SET-FIND-CARDS", cards});


//thunks
export const searchCards = (text: any) => (dispatch: ThunkDispatch) => {
    searchAPI.searchCards(text)
        .then(response => {
            dispatch(setFoundCardsAC(response.data.cards));
        })
        .catch(error => {
            return "some error"
        });
};

export type ResponseGetCardsType = {
    cards: CardType[]
    cardsTotalCount: number
    maxGrade: number
    minGrade: number
    page: number
    pageCount: number
    packUserId: string
}

export type CardType = {
    answer: string
    question: string
    cardsPack_id: string
    grade: number
    rating: number
    shots: number
    type: string
    user_id: string
    created: string
    updated: string
    __v: number
    _id: string
}



export type setFoundCardsType = ReturnType<typeof setFoundCardsAC>;
export type SearchReducerActionsType = setFoundCardsType
type ThunkDispatch = Dispatch<SearchReducerActionsType>
