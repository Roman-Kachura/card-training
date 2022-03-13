import axios, {AxiosResponse} from "axios";
import {instance} from "./authAPI";

//dal
export const CardsAPI = {
    getCards(data?: GetDataType) {
        return instance.get<CardsResp>(`/cards/card`, {params: data})
    },
    postCard(data?: PostCardData) {
        return instance.post<PostCardData, AxiosResponse<Card>>('/cards/card', data)
    },
    deleteCard(id: string) {
        console.log(id,'ID')
        return instance.delete<Card>(`/cards/card?id=${id}`)
    },
    putCard(data: PutDataType) {
        return instance.put<PutDataType, AxiosResponse<Card>>('/cards/card', data)
    },
    grade(data: GradeData) {
        return instance.put<GradeData, AxiosResponse<GradeResponse>>('/cards/grade', data)
    }
}

//type
export type CardsResp = {
    cards: Card[]
    cardsTotalCount: number
    maxGrade: number
    minGrade: number
    page: number
    pageCount: number
    packUserId: string
}

export type Card = {
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

export type GetDataType = {
    cardAnswer?: string
    cardQuestion?: string
    cardsPack_id?: string
    min?: number
    max?: number
    sortCards?: string
    page?: number
    pageCount?: number
}
export type PostCardData = {
    card: {
        cardsPack_id: string
        question?: string
        answer?: string
        grade?: number
        shots?: number
        rating?: number
        answerImg?: string
        questionImg?: string
        questionVideo?: string
        answerVideo?: string
        type?: string
    }
}

export type PutDataType = {
    card: {
        _id: string,
        question: string,
        comments?: string
    }
}

export type GradeData = {
    grade: number,
    card_id: string
}

export type GradeResponse = {
    _id: string
    cardsPack_id: string
    card_id: string
    user_id: string
    grade: number
    shots: number
} 