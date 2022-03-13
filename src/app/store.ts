import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk, {ThunkAction} from "redux-thunk";
import {AppReducer, AppReducerActionsType} from "./app-reducer";
import {RegistrationReducerActionsType, RegReducer} from "../faetures/reg/reg-reducer";
import {newPasswordReducer, NewPasswordReducerActionsType} from "../faetures/newPassword/new-password-reducer";
import {
    forgotPasswordReducer,
    ForgotPasswordReducerActionsType
} from "../faetures/forgotPassword/forgot-password-reducer";
import {AuthReducer, AuthReducerActionsType} from "../api/AuthReducer";
import {PacksReducer, PacksReducerActionsType} from "../faetures/packs/PacksReducer";
import {searchReducer, SearchReducerActionsType} from "../faetures/search/search-reducer";
import {searchPackReducer, SearchParckReducerActionsType} from "../faetures/search/search-pack-reducer";
import {ActionsCardsType, CardsReducers } from "../faetures/cards/cards-reducer";
import {learningProcessReducer} from "../faetures/learning-process/learrning-process-reducer";


const rootReducer = combineReducers({
    app: AppReducer,
    reg: RegReducer,
    auth: AuthReducer,
    newPassword: newPasswordReducer,
    forgotPassword: forgotPasswordReducer,
    packs:PacksReducer,
    searchReducer: searchReducer,
    searchPackReducer: searchPackReducer,
    cards: CardsReducers,
    learningProcessReducer: learningProcessReducer,
});


export const store = createStore(rootReducer, applyMiddleware(thunk));

export type AppRootStateType = ReturnType<typeof rootReducer>;
export type AppRootActionsType = AppReducerActionsType
    | AuthReducerActionsType
    | ForgotPasswordReducerActionsType
    | NewPasswordReducerActionsType
    | PacksReducerActionsType
    | RegistrationReducerActionsType
    | SearchReducerActionsType
    | SearchParckReducerActionsType
    | ActionsCardsType;

export type ThunkActionType = ThunkAction<void, AppRootStateType, unknown, AppRootActionsType>;
export type AppDispatch = typeof store.dispatch;

// @ts-ignore
window.store = store;