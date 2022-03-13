import React, {FormEvent, useEffect, useState} from "react";
import styles from "./LearningProcess.module.css";
import SuperButton from "../../components/SuperButton/SuperButton";
import SuperRadio from "../../components/SuperRadio/SuperRadio";
import {useDispatch, useSelector} from "react-redux";
import {setGradeTC} from "./learrning-process-reducer";
import {AppRootStateType} from "../../app/store";
import {useParams} from "react-router-dom";
import {Card} from "../../api/cards.API";
import {getCards} from "../cards/cards-reducer";
import stylesButtons from "../../style/Packs.module.css";
import {getRandomCard} from "../../utils/randomCard";
import {Spin} from "antd";

export const LearningProcess = () => {
    const gradeValues = new Map<string, number>([
        ['Did not know', 1],
        ['Forgot', 2],
        ['A lot of thought', 3],
        ['Confused', 4],
        ['Knew the answer', 5],
    ]);
    const arrayOptionsGrade = Array.from( gradeValues.keys());
    const getPackCardsById = (id: string | undefined) => (state: AppRootStateType) => {
        return state.cards.cards.filter(({ cardsPack_id }) => cardsPack_id === id);
    };

    const dispatch = useDispatch();
    const {id} = useParams<"id">();
    const cards = useSelector<AppRootStateType, any>(getPackCardsById(id));
    const [selectedCard, setSelectedCard] = useState<Card | null>(null);
    const [optionGradeValue, onChangeOptionGradeValue] = useState(arrayOptionsGrade[1]);
    const [isShowAnswer, setIsShowAnswer] = useState(false);

    const optionNumeralGrade = gradeValues.get(optionGradeValue);

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (isShowAnswer) {
            const data = {
                grade: optionNumeralGrade,
                card_id: selectedCard?._id
            };

            dispatch(setGradeTC(data));
            setSelectedCard(getRandomCard(cards));
        }

        setIsShowAnswer(!isShowAnswer);
    };

    useEffect(() => {
        dispatch(getCards({cardsPack_id: id}));
    }, []);

    useEffect(() => {
        setSelectedCard(getRandomCard(cards));
    }, [cards]);

    
    if (!selectedCard) {
        return <Spin size={'large'} tip="Loading..."/>;
    }


    return (
        <>
            <form className={styles.formLearningProcess} onSubmit={handleSubmit}>
                <div className={styles.title}>Learn {}</div>
                <div className={styles.subtitle}>
                    <b>Question:</b> {selectedCard.question}
                </div>
                {isShowAnswer &&
                    <div>
                        <div>
                            <b>Answer:</b> {selectedCard.answer}
                        </div>
                        <div className={styles.gradeList}>

                            <SuperRadio name={'radioGrade'}
                                        options={arrayOptionsGrade}
                                        value={optionGradeValue}
                                        onChangeOption={onChangeOptionGradeValue}/>
                        </div>
                    </div>
                }

                <div className={styles.blockBtn}>
                    <SuperButton  className={stylesButtons.packsButton} type="button" >Cancel</SuperButton>
                    {
                        <SuperButton type="submit" className={stylesButtons.packsButton}>
                            {
                                isShowAnswer
                                ? 'Next'
                                : 'Show answer'
                            }
                        </SuperButton>
                    }
                </div>
            </form>
        </>
    )
};

