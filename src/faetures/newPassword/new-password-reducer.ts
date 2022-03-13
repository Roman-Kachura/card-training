import {newPasswordAPI} from "./new-password-api";
import {Dispatch} from "redux";
import {setAppErrorAC} from "../../app/app-reducer";

export const initialNewPasswordState = {
    status: "idle",
    isChangedPassword: false,
    error: ""
};

export const newPasswordReducer = (state: initialNewPasswordStateType = initialNewPasswordState, action: NewPasswordReducerActionsType): initialNewPasswordStateType => {
    switch (action.type) {
        case "newPasswordReducer/SET-STATUS":
            return {...state, status: action.status};
        case 'newPasswordReducer/SET-IS-CHANGED-PASSWORD':
            return {...state, isChangedPassword: action.isChangedPassword};
        case 'newPasswordReducer/SET-ERROR':
            return {...state, error: action.error};
        default:
            return state
    }
};

//action
const setStatusAC = (status: RequestStatusType) => ({type: "newPasswordReducer/SET-STATUS", status} as const);
export const setIsChangedPasswordAC = (isChangedPassword: boolean) =>
    ({type: "newPasswordReducer/SET-IS-CHANGED-PASSWORD", isChangedPassword} as const);
export const setNewPasswordErrorAC = (error: string) => ({type: 'newPasswordReducer/SET-ERROR', error} as const);

//thunk
export const createNewPasswordTC = (data: any) => (dispatch: ThunkDispatch) => {
    newPasswordAPI.createRequestRecoveryPassword(data)
        .then(res => {
            dispatch(setStatusAC('succeeded'));
            dispatch(setAppErrorAC(''));
        })
        .catch(error => {
            dispatch(setNewPasswordErrorAC(error.response.data.error));
            dispatch(setAppErrorAC(error.response.data.error));
            if (!error.response) {
                return "some error";
            }

            dispatch(setNewPasswordErrorAC(error.response.data.error));
        })
        .finally(() => {
            dispatch(setStatusAC('succeeded'));
        })
};


//type
type initialNewPasswordStateType = typeof initialNewPasswordState;
export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed";
export type DataNewPasswordType = {
    password: string
    resetPasswordToken: string
}

export type ThunkDispatch = Dispatch<NewPasswordReducerActionsType>

export type setStatusType = ReturnType<typeof setStatusAC>
export type setIsChangedPasswordType = ReturnType<typeof setIsChangedPasswordAC>
export type setNewPasswordErrorType = ReturnType<typeof setNewPasswordErrorAC>

export type ResponseNewPasswordType = {
    info: string
    error: string
}

export type NewPasswordReducerActionsType = setStatusType
    | setIsChangedPasswordType
    | setNewPasswordErrorType
    | ReturnType<typeof setAppErrorAC>;
