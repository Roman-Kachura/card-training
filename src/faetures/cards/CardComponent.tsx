import React from "react";
import {Card} from "../../api/cards.API";
import {DeleteModal} from "../../components/modals/DeleteModal";
import SuperButton from "../../components/SuperButton/SuperButton";
import s from './Cards.module.css'

type CardPropsType = {
    id: string
    authID: string
    editCard: (cardId: string, quest: string) => void
    removeCard: (id: string) => void
    url: string
    question: string
    answer: string
    grade: number
    updated: string
    user_id: string
}

export const CardComponent: React.FC<CardPropsType> = ({
                                                           id,
                                                           editCard,
                                                           removeCard,
                                                           authID,
                                                           url,
                                                           question,
                                                           answer,
                                                           grade,
                                                           updated,
                                                           user_id,
                                                       }) => {
    return (
        <tr>
            <td>{question}</td>
            <td>{answer}</td>
            <td>{updated}</td>
            <td>{grade}</td>
            <td>
                {authID === user_id ? <SuperButton className={s.editButtonCard} onClick={() => editCard(id, question)}>Edit</SuperButton>: '-'}
                {authID === user_id ?<SuperButton red className={s.deleteButtonCard}  onClick={() => removeCard(id)}>Delete</SuperButton> : '-'}
            </td>
        </tr>
    )
}

