const initialStateApp: initialStateAppType = {
    status: 'idle',
    error: '',
    isInitialized: false
}

export const AppReducer = (state: initialStateAppType = initialStateApp, action: AppReducerActionsType): initialStateAppType => {
    switch (action.type) {
        case "app/SET-STATUS":
            return {...state, status: action.status};
        case "app/SET-INITIALIZED":
            return {...state, isInitialized: action.value};
        case "app/SET-ERROR":
            return {...state, error: action.error}
        default:
            return state
    }
}

// action
export const setStatusAppAC = (status: RequestStatusType) => ({type: 'app/SET-STATUS', status} as const);
export const setInitialized = (value: boolean) => ({type: 'app/SET-INITIALIZED', value} as const);
export const setAppErrorAC = (error: string) => ({type: 'app/SET-ERROR', error} as const);
// thunk

// type

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed';
type initialStateAppType = {
    status: RequestStatusType
    error: string
    isInitialized: boolean
}
export type AppReducerActionsType =
    ReturnType<typeof setStatusAppAC>
    | ReturnType<typeof setInitialized>
    | ReturnType<typeof setAppErrorAC>;