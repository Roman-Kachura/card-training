import {setAppErrorAC, setStatusAppAC} from '../../app/app-reducer';
import {Dispatch} from "redux";
import {GetDateType, PackDataType, PacksAPI} from "../../api/packsAPI";
import {ThunkActionType} from "../../app/store";

let initialState: PacksReducerStateType = {
    packs: [],
    totalCount: 0,
    pageCount: 10,
    page: 1,
    sortMethod: undefined
}

export const PacksReducer = (state: PacksReducerStateType = initialState, action: PacksReducerActionsType) => {
    switch (action.type) {
        case "packs/GET-PACKS":
            return {...state, packs: action.packs};
        case "packs/SET-TOTAL-COUNT":
            return {...state, totalCount: action.totalCount};
        case "packs/SET-PAGE-COUNT":
            return {...state, pageCount: action.pageCount}
        case "packs/SET-PAGE":
            return {...state, page: action.page}
        case "packs/CHANGE-PACK-TITLE":
            return {...state, packs: state.packs.map(p => p._id === action.id ? {...p, name: action.name} : p)};
        case "sort/SORT-PACKS":
            return {...state, sortMethod: action.sortMethod}
        default:
            return state;
    }
}

//Actions
const getPacksAC = (packs: Array<PackDataType>) => ({type: 'packs/GET-PACKS', packs} as const);
const setPacksTotalCountAC = (totalCount: number) => ({type: 'packs/SET-TOTAL-COUNT', totalCount} as const);
const setPacksPageCountAC = (pageCount: number) => ({type: 'packs/SET-PAGE-COUNT', pageCount} as const);
export const setPacksPageAC = (page: number) => ({type: 'packs/SET-PAGE', page} as const);
const addPackAC = (pack: PackDataType) => ({type: 'packs/ADD-PACK', pack} as const);
const changePackTitleAC = (id: string, name: string) => ({type: 'packs/CHANGE-PACK-TITLE', id, name} as const);
const removePackAC = (id: string) => ({type: 'packs/REMOVE-PACK', id} as const);
export const setSortPacks = (sortMethod: string) => ({type: 'sort/SORT-PACKS', sortMethod} as const)

//Thunks
export const getPacksTC = (data: GetDateType) => (dispatch: Dispatch) => {
    dispatch(setStatusAppAC('loading'));
    PacksAPI.getPacks(data)
        .then(res => {
            dispatch(getPacksAC(res.data.cardPacks));
            dispatch(setPacksTotalCountAC(res.data.cardPacksTotalCount));
            dispatch(setPacksPageCountAC(res.data.pageCount));
            dispatch(setPacksPageAC(res.data.page));
            dispatch(setAppErrorAC(''));
            dispatch(setStatusAppAC('succeeded'));
        })
        .catch(e => {
            const error = e.response ? e.response.data.error : e.message + ' more details in the console';
            dispatch(setAppErrorAC(error));
            dispatch(setStatusAppAC('failed'));
        })
        .finally(() => {
            dispatch(setStatusAppAC('idle'));
        })
}

export const createPackTC = (value: string, showMyPacksPage: boolean, userID?: string): ThunkActionType =>
    (dispatch) => {
        dispatch(setStatusAppAC('loading'));
        PacksAPI.addPack(value)
            .then(res => {
                if (showMyPacksPage) {
                    dispatch(getPacksTC({id: userID, currentPage: 1}));
                } else {
                    dispatch(getPacksTC({currentPage: 1}));
                }
                dispatch(setAppErrorAC(''));
                dispatch(setStatusAppAC('succeeded'));
            }).catch(e => {
            const error = e.response ? e.response.data.error : e.message + ' more details in the console';
            dispatch(setAppErrorAC(error));
            dispatch(setStatusAppAC('failed'));
        })
            .finally(() => {
                dispatch(setStatusAppAC('idle'));
            })

    }

export const changePackTitleTC = (id: string, name: string) => (dispatch: Dispatch) => {
    dispatch(setStatusAppAC('loading'));
    PacksAPI.changePack(id, name)
        .then(res => {
            dispatch(changePackTitleAC(id, name));
            dispatch(setAppErrorAC(''));
            dispatch(setStatusAppAC('succeeded'));
        })
        .catch(e => {
            const error = e.response ? e.response.data.error : e.message + ' more details in the console';
            dispatch(setAppErrorAC(error));
            dispatch(setStatusAppAC('failed'));
        })
        .finally(() => {
            dispatch(setStatusAppAC('idle'));
        })

}

export const removePackTC = (id: string, currentPage: number, showMyPacksPage: boolean, userID?: string): ThunkActionType =>
    (dispatch) => {
        dispatch(setStatusAppAC('loading'));
        PacksAPI.removePack(id)
            .then(res => {
                if (showMyPacksPage) {
                    dispatch(getPacksTC({id: userID, currentPage}));
                } else {
                    dispatch(getPacksTC({currentPage}));
                }
                dispatch(setAppErrorAC(''));
                dispatch(setStatusAppAC('succeeded'));
            })
            .catch(e => {
                const error = e.response ? e.response.data.error : e.message + ' more details in the console';
                dispatch(setAppErrorAC(error));
                dispatch(setStatusAppAC('failed'));
            })
            .finally(() => {
                dispatch(setStatusAppAC('idle'));
            })
    }


//Types
type PacksReducerStateType = {
    packs: Array<PackDataType>
    totalCount: number
    pageCount: number
    page: number
    sortMethod: string | undefined
}
export type PacksReducerActionsType = ReturnType<typeof getPacksAC>
    | ReturnType<typeof addPackAC>
    | ReturnType<typeof setPacksTotalCountAC>
    | ReturnType<typeof setPacksPageAC>
    | ReturnType<typeof changePackTitleAC>
    | ReturnType<typeof removePackAC>
    | ReturnType<typeof setSortPacks>
    | ReturnType<typeof setPacksPageCountAC>
    | ReturnType<typeof removePackAC>;

