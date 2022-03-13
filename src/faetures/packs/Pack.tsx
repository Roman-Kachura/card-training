import React from "react";
import {useNavigate} from "react-router-dom";
import {PackDataType} from "../../api/packsAPI";
import SuperButton from "../../components/SuperButton/SuperButton";
import s from './../../style/Packs.module.css';
import {correctionDate} from "../../utils/correctionDate";
import {validationValue} from "../../utils/validationValue";
import {DeleteModal} from "../../components/modals/DeleteModal";

export const Pack: React.FC<PackPropsType> = (
    {
        pack,
        authID,
        editHandler,
        removePack,
        changeShowDeleteModal,
        ...props
    }
) => {
    let navigate = useNavigate();

    const onChangeShowDeleteModal = () => changeShowDeleteModal(pack.name, pack._id);


    return (
        <tr>
            <td>{validationValue(pack.name)}</td>
            <td>{pack.cardsCount}</td>
            <td>{correctionDate(pack.updated)}</td>
            <td>{validationValue(pack.user_name)}</td>
            <td>
                {authID === pack.user_id && <SuperButton red className={s.packsButtonDelete}
                                                         onClick={onChangeShowDeleteModal}>Delete</SuperButton>}
                {authID === pack.user_id &&
                    <SuperButton className={s.packsButton}
                                 onClick={() => editHandler(pack._id, pack.name)}>Edit</SuperButton>}
                <SuperButton className={s.packsButton}
                             onClick={() => navigate('/cards/' + pack._id)}>Cards</SuperButton>
                {pack.cardsCount !==0 &&
                    <SuperButton className={s.packsButton}
                             onClick={() => navigate('/learning-process/' + pack._id)}>Learn</SuperButton>
                }

            </td>
        </tr>
    )
}

type PackPropsType = {
    pack: PackDataType
    authID: string
    editHandler: (id: string, name: string) => void
    removePack: (id: string) => void
    changeShowDeleteModal: (name: string, id: string) => void
}