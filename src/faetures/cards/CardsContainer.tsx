import React, {useEffect, KeyboardEvent} from "react";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Card} from "../../api/cards.API";
import {AppRootStateType} from "../../app/store";
import {Cards} from "./Cards";
import {deleteCard, getCards, intialCardsStateType, postCard, putCard, setCardsCountOnPage, setSortCards} from "./cards-reducer";
import {RequestStatusType} from "../../app/app-reducer";
import {Spin} from "antd";
import {Navigate, useNavigate, useParams} from "react-router-dom";
import {PATH} from "../../routes/routes";
import {DeleteModal} from "../../components/modals/DeleteModal";
import {InputModal} from "../../components/modals/InputModal";
import { useCallback } from "react";


export const CardsContainer: React.FC = () => {
    //useSlector
    const {
        cards,
        cardsTotalCount,
        page,
        packUserId,
        sortCardsMethod
    } = useSelector<AppRootStateType, intialCardsStateType>(state => state.cards);
    const authID: string = useSelector<AppRootStateType, string>(state => state.auth.user._id);
    const isLoggedIn: boolean = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn);

    //any
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {id} = useParams<{ id: string }>();
    const options = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    //hooks
    const [pageCount, setPageCount] = useState(10);
    const [elementName, setElementName] = useState('');
    const [answerCard, setAnswerCard] = useState('');
    const [questCard, setQuestCard] = useState('');
    const [cardId, setCardId] = useState('');
    const [showAddModal, setShowAddModal] = useState(false);
    const [showQuestionModal, setShowQuestionModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [textSearch, setTextSearch] = useState<string>("");
    const [searchValue, setSearchValue] = useState('');
    const [filteredCards, setFilteredCards] = useState<Card | any>(cards)

    //utils funcs
    const changeNumberPage = useCallback((value: number) => {
        dispatch(setCardsCountOnPage(value));
    },[dispatch]);

    const sortCallBack = useCallback((sort: string) => {
        dispatch(setSortCards(sort))
    },[dispatch])

    const changePageCount = useCallback((value: number) => {
        setPageCount(+value);
    },[setPageCount])

    //addCard funcs
    const addCard = useCallback(() => {
        setShowAddModal(true)
    },[setShowAddModal])

    const addCardModal = useCallback(() => {
        if(id)
        dispatch(postCard({
            card: {
                cardsPack_id: id,
                question: questCard,
                answer: answerCard
            }
        }, id))
        setShowAddModal(false);
        setAnswerCard('');
        setQuestCard('');
    },[id,dispatch,setShowAddModal,setAnswerCard,setQuestCard,questCard,answerCard]);

    const onCloseAdd = useCallback(() => {
        setShowAddModal(false)
        setAnswerCard('');
        setQuestCard('');
    },[setShowAddModal,setAnswerCard,setQuestCard])

    const onChangeCardAnswer = useCallback((value: string) => setAnswerCard(value),[setAnswerCard]);
    const onChangeQuestCard = useCallback((value: string) => setQuestCard(value),[setQuestCard]);

    //edit card funcs
    const editCard = useCallback((id: string, quest: string) => {
        setCardId(id);
        setQuestCard(quest)
        setShowEditModal(true);
    },[setCardId,setQuestCard,setShowEditModal]);

    const editCardModal = useCallback(() => {
        if(id)
            dispatch(putCard({
                card:{
                    _id: cardId,
                    question: questCard,
                }
            }, id))
        setQuestCard('');
        setShowEditModal(false);
    },[id,dispatch,setQuestCard,setShowEditModal,cardId,questCard])

    const onCloseEdit = useCallback(() => {
        setQuestCard('');
        setShowEditModal(false);
    },[setQuestCard,setShowEditModal])

    //delete crad funcs
    const removeCard = useCallback((cardId: string) => {
        setCardId(cardId);
        setShowQuestionModal(true)
    },[setCardId,setShowQuestionModal]);

    const deleteModalQuest = useCallback(() => {
        if (cardId !== '' && id)
            dispatch(deleteCard(cardId, id));
        setShowQuestionModal(false)
    },[cardId,id, dispatch, setShowQuestionModal])

    //search
    const searchCards = (value: string) => {
        setSearchValue(value);
    }

    const searchCardsSend = (e: KeyboardEvent<HTMLDivElement>) => {
        if(e.key === "Enter" && textSearch !== '') {
            setFilteredCards(cards.filter((c: Card) => c.question.toLowerCase().includes(textSearch.toLowerCase())))
            searchCards(textSearch);
        } else if(e.key === "Enter" && textSearch === '') {
            setFilteredCards(cards)
        }
    }

    const onChangeHandlerSearch = (value: string) => {
        setTextSearch(value);
    }

    useEffect(() => {
        if (isLoggedIn) {
            if (id)
                dispatch(getCards({cardsPack_id: id, page: page, sortCards: sortCardsMethod, pageCount: pageCount}));
        }
    }, [dispatch, id, sortCardsMethod, page, pageCount])

    if (!isLoggedIn) {
        return <Navigate to={PATH.LOGIN}/>
    }

    return (
        <div>
            <InputModal
                modalName='+Add New Card'
                name='addCard'
                placeholder='Card Answer'
                value={answerCard}
                value2={questCard}
                show={showAddModal}
                onChange={onChangeCardAnswer}
                onChange2={onChangeQuestCard}
                onClose={onCloseAdd}
                onSave={addCardModal}
                question='Card Question'
            />
            <InputModal
                modalName='Edit Card'
                name='Edit Card'
                placeholder='Edit Card'
                value={questCard}
                show={showEditModal}
                onChange={onChangeQuestCard}
                onClose={onCloseEdit}
                onSave={editCardModal}
            />
            <DeleteModal
                show={showQuestionModal}
                elementName={elementName}
                typeElement={'card'}
                onClose={() => setShowQuestionModal(false)}
                onConfirm={deleteModalQuest}
            />
            <Cards
                navigate={navigate}
                changeNumberPage={changeNumberPage}
                cardsTotalCount={cardsTotalCount}
                cards={filteredCards}
                authID={authID}
                editCard={editCard}
                removeCard={removeCard}
                page={page}
                addCard={addCard}
                sortCallBack={sortCallBack}
                sortCardsMethod={sortCardsMethod}
                pageCount={pageCount}
                changePageCount={changePageCount}
                options={options}
                onChangeHandlerSearch={onChangeHandlerSearch}
                searchCardsSend={searchCardsSend}
            />
        </div>
    )
}
