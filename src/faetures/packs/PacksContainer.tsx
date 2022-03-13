import {Packs} from "./Packs";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../app/store";
import {Navigate} from "react-router-dom";
import {PATH} from "../../routes/routes";
import React, {useCallback, useEffect, useState} from "react";
import {getPacksTC, createPackTC, changePackTitleTC, removePackTC, setPacksPageAC, setSortPacks} from "./PacksReducer";
import {PackDataType} from "../../api/packsAPI";
import {InputModal} from "../../components/modals/InputModal";
import {DeleteModal} from "../../components/modals/DeleteModal";

export const PacksContainer = () => {
    const [rangeValue, setRangeValue] = useState<[number, number]>([0, 200]);
    const [min, setMin] = useState<number>(0);
    const [max, setMax] = useState<number>(200);
    const options = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const [pageCount, setPageCount] = useState(10);
    const currentPage: number = useSelector<AppRootStateType, number>(state => state.packs.page);
    const [searchValue, setSearchValue] = useState('');
    const [showMyPacksPage, setShowMyPacksPage] = useState(false);
    const [cardName, setCardName] = useState('');
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [elementIdForDelete, setElementIdForDelete] = useState('');
    const [elementNameForDelete, setElementNameForDelete] = useState('');
    const [editName, setEditName] = useState('');
    const [packId, setPackId] = useState('');
    const dispatch = useDispatch();
    const isLoggedIn: boolean = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn);
    const packs: Array<PackDataType> = useSelector<AppRootStateType, Array<PackDataType>>(state => state.packs.packs);
    const authID: string = useSelector<AppRootStateType, string>(state => state.auth.user._id);
    const totalCount: number = useSelector<AppRootStateType, number>(state => state.packs.totalCount);
    const sortType = useSelector<AppRootStateType, string | undefined>(state => state.packs.sortMethod);
    const error: string = useSelector<AppRootStateType, string>(state => state.app.error);

    const searchPacks = useCallback((value: string) => {
        setMin(rangeValue[0]);
        setMax(rangeValue[1]);
        setSearchValue(value);
    }, [rangeValue, showMyPacksPage, searchValue])

    const changeRangeValue = (value: [number, number]) => {
        setRangeValue(value);
    }

    const changePageCount = (value: number) => {
        setPageCount(+value);
    }

    const changeNumberPage = useCallback((value: number) => {
        dispatch(setPacksPageAC(value));
    }, [currentPage]);

    const getAllPacks = useCallback(() => {
        setShowMyPacksPage(false);
        dispatch(getPacksTC({currentPage, pageCount}));
    }, [currentPage, showMyPacksPage, pageCount])

    const getMyPacks = useCallback(() => {
        setShowMyPacksPage(true);
        dispatch(getPacksTC({id: authID, currentPage}));
    }, [showMyPacksPage, currentPage, authID])

    const onChangeSearchValue = (value: string) => {
        setSearchValue(value);
    }

    const addPacks = () => {
        setShowAddModal(true);
    };

    const changeShowDeleteModal = (name: string, id: string) => {
        setElementNameForDelete(name)
        setElementIdForDelete(id)
        setShowDeleteModal(true);
    }

    const addPack = () => {
        dispatch(createPackTC(cardName, showMyPacksPage, authID));
        setShowAddModal(false);
        setCardName('');
    }

    const changeTitle = useCallback(() => {
        dispatch(changePackTitleTC(packId, editName));
        setShowEditModal(false);
        setEditName('');
        setPackId('');
    }, [packId, editName])

    const closeModal = useCallback(() => {
        if (showAddModal) {
            setShowAddModal(false);
            setCardName('');
        } else if (showEditModal) {
            setShowEditModal(false);
            setEditName('');
            setPackId('');
        } else if (showDeleteModal) {
            setElementNameForDelete('');
            setElementIdForDelete('');
            setShowDeleteModal(false);
        }
    }, [showDeleteModal, elementIdForDelete, elementNameForDelete, showAddModal, cardName, showEditModal, editName, packId]);


    const sortCallBack = (sort: string) => {
        dispatch(setSortPacks(sort))
    }
    const removePack = useCallback(() => {
        dispatch(removePackTC(elementIdForDelete, currentPage, showMyPacksPage, authID));
        closeModal();
    }, [elementIdForDelete, currentPage, showMyPacksPage, authID]);

    useEffect(() => {
        if (isLoggedIn) {
            const userID = showMyPacksPage ? authID : undefined;
            dispatch(getPacksTC({id: userID, sortType, currentPage, pageCount, min, max, packName: searchValue}));
        }
    }, [dispatch, isLoggedIn, currentPage, sortType, pageCount, min, max, searchValue]);


    const onChangePackNameHandler = (value: string) => setCardName(value);
    const onChangeEditNameHandler = (value: string) => setEditName(value);

    const editHandler = (id: string, name: string) => {
        setEditName(name);
        setPackId(id);
        setShowEditModal(true);
    }

    if (!isLoggedIn) {
        return <Navigate to={PATH.LOGIN}/>
    }

    return (
        <div>
            <InputModal
                modalName='Add new pack'
                name='CardName'
                placeholder='CardName'
                value={cardName}
                show={showAddModal}
                onChange={onChangePackNameHandler}
                onClose={closeModal}
                onSave={addPack}
            />

            <InputModal
                modalName='Rename pack'
                name='ChangeCardName'
                placeholder='ChangeCardName'
                value={editName}
                show={showEditModal}
                onChange={onChangeEditNameHandler}
                onClose={closeModal}
                onSave={changeTitle}
            />

            <DeleteModal
                typeElement={'pack'}
                elementName={elementNameForDelete}
                onConfirm={removePack}
                onClose={closeModal}
                show={showDeleteModal}
            />
            <Packs
                getPacks={getAllPacks}
                sortCallback={sortCallBack}
                sortMethod={sortType}
                addPacks={addPacks}
                onChangeSearchValue={onChangeSearchValue}
                packs={packs}
                authID={authID}
                searchValue={searchValue}
                editHandler={editHandler}
                removePack={removePack}
                totalCount={totalCount}
                currentPage={currentPage}
                changeNumberPage={changeNumberPage}
                getMyPacks={getMyPacks}
                showMyPacksPage={showMyPacksPage}
                options={options}
                changePageCount={changePageCount}
                pageCount={pageCount}
                changeRangeValue={changeRangeValue}
                rangeValue={rangeValue}
                searchPacks={searchPacks}
                changeShowDeleteModal={changeShowDeleteModal}
            />
        </div>
    )
}

