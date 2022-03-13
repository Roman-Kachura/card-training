import {forgotPasswordAPI} from "./forgot-password-api";
import {Dispatch} from "redux";
import {setAppErrorAC} from "../../app/app-reducer";

export const initialForgotPasswordState = {
    status: "idle",
    isCreateForgotPasswordRequest: false,
    error: ""
};

export const forgotPasswordReducer = (state: initialForgotPasswordStateType = initialForgotPasswordState, action: ForgotPasswordReducerActionsType): initialForgotPasswordStateType => {
    switch (action.type) {
        case "forgotPasswordReducer/SET-STATUS":
            return {...state, status: action.status};
        case "forgotPasswordReducer/SET-IS-CREATED-PASSWORD-REQUEST":
            return {...state, isCreateForgotPasswordRequest: action.isCreateForgotPasswordRequest};
        case "forgotPasswordReducer/SET-ERROR":
            return {...state, error: action.error};
        default:
            return state
    }
};

//action
const setStatusAC = (status: RequestStatusType) => ({type: "forgotPasswordReducer/SET-STATUS", status} as const);
export const setIsCreateForgotPasswordRequestAC = (isCreateForgotPasswordRequest: boolean) =>
    ({type: "forgotPasswordReducer/SET-IS-CREATED-PASSWORD-REQUEST", isCreateForgotPasswordRequest} as const);
export const setForgotPasswordErrorAC = (error: string) => ({type: 'forgotPasswordReducer/SET-ERROR', error} as const);

//thunk
export const createForgotPasswordRequestTC = (data: DataForgotPasswordType) => (dispatch: ThunkDispatch) => {
    forgotPasswordAPI.createForgotPasswordRequest(data)
        .then(res => {
            dispatch(setAppErrorAC(''));
            dispatch(setStatusAC('succeeded'));
        })
        .catch(error => {
            dispatch(setForgotPasswordErrorAC(error.response.data.error));
            dispatch(setAppErrorAC(error.response.data.error));
            if (!error.response) {
                return "some error";
            }

            dispatch(setForgotPasswordErrorAC(error.response.data.error));
        })
        .finally(() => {
            dispatch(setStatusAC('succeeded'));
        })
};


//type
type initialForgotPasswordStateType = typeof initialForgotPasswordState;
export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed";
export type DataForgotPasswordType = {
    email: string,
    from?: string,
    message: string
}

export type ThunkDispatch = Dispatch<ForgotPasswordReducerActionsType>

export type setStatusType = ReturnType<typeof setStatusAC>
export type setIsCreateForgotPasswordRequestType = ReturnType<typeof setIsCreateForgotPasswordRequestAC>
export type setForgotPasswordErrorType = ReturnType<typeof setForgotPasswordErrorAC>

export type ResponseForgotPasswordType = {
    info: string
    error: string
}


export type ForgotPasswordReducerActionsType = setStatusType
    | setIsCreateForgotPasswordRequestType
    | setForgotPasswordErrorType
    | ReturnType<typeof setAppErrorAC>;
