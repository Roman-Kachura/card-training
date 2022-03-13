import React from "react";
import {PackDataType} from "../../api/packsAPI";
import {Pack} from "./Pack";
import s from './../../style/Packs.module.css';
import SuperButton from "../../components/SuperButton/SuperButton";
import {MyPagination} from "../../components/pagination/MyPagination";
import {Sort} from "../../components/sort/Sort";
import {SearchPack} from "../search/SearchPack";
import {Spin} from "antd";
import SuperSelect from "../../components/SuperSelect/SuperSelect";
import {RequestStatusType} from "../../app/app-reducer";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../app/store";
import {Navigate} from "react-router-dom";
import {PATH} from "../../routes/routes";
import {DeleteModal} from "../../components/modals/DeleteModal";


export const Packs = React.memo(function (
    {
        getPacks,
        sortMethod,
        getMyPacks,
        totalCount,
        currentPage,
        removePack,
        packs,
        authID,
        searchValue,
        onChangeSearchValue,
        addPacks,
        editHandler,
        changeNumberPage,
        sortCallback,
        showMyPacksPage,
        options,
        changePageCount,
        pageCount,
        changeRangeValue,
        rangeValue,
        searchPacks,
        changeShowDeleteModal,
        ...props
    }: PacksPropsType
) {
    const status: RequestStatusType = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status);

    if (status === 'loading') {
        return <Spin size={'large'} tip="Loading..."/>
    }

    return (
        <div className={s.packs}>
            <div className={s.packsAside}>
                <h3 className={s.packsAsideTitle}>Show packs cards</h3>
                <div className={s.packsAsideButtonBlock}>
                    <SuperButton className={`${s.packsAsideButton} ${!showMyPacksPage ? s.active : ''}`}
                                 onClick={getPacks}>All Packs</SuperButton>
                    <SuperButton className={`${s.packsAsideButton} ${showMyPacksPage ? s.active : ''}`}
                                 onClick={getMyPacks}>My Packs</SuperButton>
                </div>
                <SearchPack
                    searchValue={searchValue}
                    searchPacks={searchPacks}
                    rangeValue={rangeValue}
                    changeRangeValue={changeRangeValue}
                    onChangeSearchValue={onChangeSearchValue}
                />
            </div>
            <div className={s.packsMain}>
                <h3 className={s.packsMainTitle}>Cards Packs list</h3>
                <SuperButton className={s.addPackButton} onClick={addPacks}>+ Add new pack</SuperButton>
                <table className={s.table}>
                    <thead className={s.thead}>
                    <tr>
                        <td><Sort name={'name'} sortCallback={sortCallback} sortMethod={sortMethod}>Name</Sort></td>
                        <td><Sort name={'cardsCount'} sortCallback={sortCallback} sortMethod={sortMethod}>Cards</Sort>
                        </td>
                        <td><Sort name={'updated'} sortCallback={sortCallback} sortMethod={sortMethod}>Last
                            Updated</Sort></td>
                        <td><Sort name={'created'} sortCallback={sortCallback} sortMethod={sortMethod}>Created by</Sort>
                        </td>
                        <td>Actions</td>
                    </tr>
                    </thead>
                    <tbody className={s.tbody}>
                    {packs.map(m => <Pack
                        key={m._id}
                        changeShowDeleteModal={changeShowDeleteModal}
                        pack={m}
                        authID={authID}
                        editHandler={editHandler}
                        removePack={removePack}
                    />)
                    }
                    </tbody>
                </table>
                <div className={s.navigationBlock}>
                    <MyPagination totalCount={totalCount} currentPage={currentPage} onClickHandler={changeNumberPage}
                                  pageCount={pageCount}/>
                    <div className={s.select}>
                        Show Cards Per Page: <SuperSelect
                        value={pageCount}
                        name='CardPerPage'
                        options={options}
                        onChangeOption={changePageCount}
                    />
                    </div>

                </div>
            </div>
        </div>
    )
})

type PacksPropsType = {
    getPacks: () => void
    getMyPacks: () => void
    packs: Array<PackDataType>
    authID: string
    searchValue: string
    onChangeSearchValue: (value: string) => void
    addPacks: () => void
    editHandler: (id: string, name: string) => void
    removePack: (id: string) => void
    totalCount: number
    currentPage: number
    changeNumberPage: (value: number) => void
    sortCallback: (sort: string) => void,
    sortMethod: string | undefined,
    showMyPacksPage: boolean
    options: number[]
    changePageCount: (value: number) => void
    pageCount: number
    changeRangeValue: (value: [number, number]) => void
    rangeValue: [number, number]
    searchPacks: (value: string) => void
    changeShowDeleteModal: (name: string, id: string) => void
}