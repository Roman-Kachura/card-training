import {registerApi, RegisterRequestType} from "../../api/registerApi";
import {ThunkActionType} from "../../app/store";
import {loginTC} from "../../api/AuthReducer";
import {setAppErrorAC, setStatusAppAC} from "../../app/app-reducer";


type StateType = {
    toggleRegistration: boolean
    errMsg: string
};

const initialStateReg: StateType = {
    toggleRegistration: false,
    errMsg: '',
}

export const RegReducer = (state = initialStateReg, action: RegistrationReducerActionsType) => {
    switch (action.type) {
        case "TOGGLE_IS_REGISTRATION":
            return {...state, toggleRegistration: action.value}
        case "SET_ERR_REQUEST":
            return {...state, errMsg: action.value}
        default:
            return state
    }
}

// actionCreator
const toggleIsRegistration = (value: boolean) => ({type: "TOGGLE_IS_REGISTRATION", value} as const);
const setErrRequest = (value: string) => ({type: 'SET_ERR_REQUEST', value} as const);

// thunk

export const registerTC = (data: RegisterRequestType): ThunkActionType =>
    (dispatch) => {
        dispatch(setStatusAppAC('loading'));
        registerApi.register(data)
            .then(res => {
                dispatch(toggleIsRegistration(true));
                dispatch(loginTC(data.email, data.password, false));
                dispatch(setAppErrorAC(''));
                dispatch(setStatusAppAC('succeeded'));
            })
            .catch(e => {
                dispatch(setErrRequest(e.response.data.error));
                dispatch(setAppErrorAC(e.response.data.error));
                dispatch(setStatusAppAC('failed'));
            })
            .finally(() => {
                dispatch(setStatusAppAC('idle'));
            })
    }

// type

export type RegistrationReducerActionsType = ReturnType<typeof toggleIsRegistration> | ReturnType<typeof setErrRequest>;