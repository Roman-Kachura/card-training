import {defaultPacksPageCount} from "../../api/packsAPI";
import SuperButton from "../SuperButton/SuperButton";
import {useEffect, useState} from "react";
import s from '../../style/Pagination.module.css';

export const MyPagination = ({totalCount, pageCount, currentPage, onClickHandler}: MyPaginationPropsType) => {
    //totalCount - кол-во всех элементов
    //pageCount - кол-во отображаемых элементов дефолтное значение - 10
    //currentPage - текущая страница
    //onClickHandler - Функция которая принимает число(страницу) которую нужно отобразить
    const [page, setPage] = useState(currentPage);

    useEffect(() => {
        setPage(currentPage)
    }, [currentPage]);

    const [lastPage,setLastPage] = useState(0);

    useEffect(()=>{
        if (!pageCount) pageCount = defaultPacksPageCount;
        setLastPage(Math.ceil(totalCount / pageCount));
    },[totalCount,pageCount])


    // let lastPage = Math.ceil(totalCount / pageCount);
    let num = [];
    let from = page;
    let to = from + 3;

    if (lastPage === 1) {
        return <SuperButton className={`${s.paginationButton} ${s.active}`} onClick={() => {
            onClickHandler(1)
        }}>1</SuperButton>;
    }

    if (lastPage <= 5) {
        for (let i = 1; i <= lastPage; i++) {
            num.push(i);
        }
    } else {
        num.push(1);
        num.push('<');
        if (page === 1) {
            from = 2;
            to = 5;
        } else if (page <= lastPage && page > lastPage - 5) {
            from = lastPage - 5;
            to = lastPage - 1;
        }

        for (let i = from, k = 2; i <= to; i++, k++) {
            num[k] = i;
        }
        num.push('>');
        num.push(lastPage);
    }

    // console.log(totalCount + ' / ' + pageCount + '=' + lastPage)
    return (
        <div className={s.paginationBlock}>
            {num.map(n => {
                const active = n === page ? `${s.active}` : '';
                if (typeof n === 'number') {
                    return <SuperButton className={`${s.paginationButton} ${active}`} key={n} onClick={() => {
                        onClickHandler(n)
                    }}>{n}</SuperButton>
                } else {
                    if (n === '<' && page > 2) {
                        return <SuperButton className={s.paginationButton} key={n} onClick={() => {
                            onClickHandler(from - 1)
                        }}>{n}</SuperButton>
                    }

                    if (n === '>' && page < lastPage - 4) {
                        return <SuperButton className={s.paginationButton} key={n} onClick={() => {
                            onClickHandler(to + 1)
                        }}>{n}</SuperButton>
                    }
                }

            })}
        </div>
    )
}

type MyPaginationPropsType = {
    totalCount: number
    pageCount?: number
    currentPage: number
    onClickHandler: (value: number) => void
}
