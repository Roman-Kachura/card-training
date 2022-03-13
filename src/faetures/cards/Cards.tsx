import React, {useEffect, KeyboardEvent} from "react";
import {Link, Navigate, useNavigate} from "react-router-dom";
import {Card, CardsAPI} from "../../api/cards.API";
import {MyPagination} from "../../components/pagination/MyPagination";
import {Sort} from "../../components/sort/Sort";
import SuperButton from "../../components/SuperButton/SuperButton";
import SuperInputText from "../../components/SuperInputText/SuperInputText";
import SuperSelect from "../../components/SuperSelect/SuperSelect";
import { PATH } from "../../routes/routes";
import {CardComponent} from "./CardComponent";
import {postCard} from "./cards-reducer";
import s from './Cards.module.css'
import magnifyingGlass from './Icon.png'
import vector from './Vector.svg'
import {Spin} from "antd";
import {RequestStatusType} from "../../app/app-reducer";
import {useSelector} from "react-redux";
import { AppRootStateType } from "../../app/store";

type CardsType = {
    cards: Card[],
    authID: string,
    removeCard: (id: string) => void,
    sortCallBack: (sort: string) => void
    editCard: (cardId: string, quest: string) => void,
    cardsTotalCount: number,
    page: number,
    changeNumberPage: (value: number) => void,
    addCard: (value: boolean) => void,
    sortCardsMethod: string | undefined,
    pageCount: number,
    changePageCount: (value: number) => void,
    options: number[],
    navigate: (value: string) => void,
    onChangeHandlerSearch: (value: string) => void,
    searchCardsSend: (e: KeyboardEvent<HTMLDivElement>) => void
}

export const Cards: React.FC<CardsType> = React.memo((
    {
        cards,
        authID,
        removeCard,
        editCard,
        cardsTotalCount,
        page,
        changeNumberPage,
        addCard,
        sortCallBack,
        sortCardsMethod,
        pageCount,
        changePageCount,
        options,
        navigate,
        onChangeHandlerSearch,
        searchCardsSend
    }
) => {
    const status: RequestStatusType = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status);

    if (status === 'loading') {
        return <Spin size={'large'} tip="Loading..."/>
    }

    return (
        <div className={s.cards}>
            <div className={s.hoverImg}>
                <img src={vector} className={s.vector} onClick={() => navigate(PATH.PACKS)}/>
                <h3 className={s.cardsTitle}>Cards List</h3>
            </div>
            <div className={s.btnHover}>
                <SuperButton className={s.addCard} onClick={() => addCard(true)}>
                    + Add New Card
                </SuperButton>
            </div>
            <div>
                <SuperInputText placeholder={'Search...'} className={s.searchCards}
                                onChangeText={onChangeHandlerSearch} onKeyPress={searchCardsSend}
                />
            </div>
            <table className={s.table}>
                <thead className={s.thead}>
                <tr>
                    <td><Sort name={'question'} sortMethod={sortCardsMethod} sortCallback={sortCallBack}>Question</Sort>
                    </td>
                    <td><Sort name={'answer'} sortMethod={sortCardsMethod} sortCallback={sortCallBack}>Answer</Sort>
                    </td>
                    <td><Sort name={'updated'} sortMethod={sortCardsMethod} sortCallback={sortCallBack}>Update</Sort>
                    </td>
                    <td><Sort name={'grade'} sortMethod={sortCardsMethod} sortCallback={sortCallBack}>Grade</Sort></td>
                    <td>Actions</td>
                </tr>
                </thead>
                <tbody className={s.tbody}>
                {cards.map(c =>
                    <CardComponent
                        key={c._id} id={c._id} question={c.question}
                        authID={authID} editCard={editCard} removeCard={removeCard}
                        grade={c.grade} answer={c.answer} updated={c.updated}
                        user_id={c.user_id} url={''}/>)}
                </tbody>
            </table>
            <div className={s.navigationBlock}>
                <MyPagination totalCount={cardsTotalCount} currentPage={page} onClickHandler={changeNumberPage}
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
    )
})