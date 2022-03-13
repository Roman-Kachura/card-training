import SuperInputText from "../../components/SuperInputText/SuperInputText";
import React, {useState} from "react";
import {useDebounce} from "../../hooks/useDebounce";
import SuperButton from "../../components/SuperButton/SuperButton";
import {useDispatch} from "react-redux";
import {Slider} from "antd";
import 'antd/dist/antd.css';
import {searchPacks} from "./search-pack-reducer";
import s from "../../style/Packs.module.css";


export const SearchPack = (
    {
        changeRangeValue,
        rangeValue,
        searchValue,
        onChangeSearchValue,
        searchPacks,
        ...props
    }: SearchPackPropsType
) => {
    const dispatch = useDispatch();
    const [textSearch, setTextSearch] = useState<string>("");
    const minValueRange = 0;
    const maxValueRange = 200;
    const stepRange = 1;


    // Надя
    // function valueLogging(value: any) {
    //     dispatch(searchPacks(value));
    // }
    //
    // const debouncedFunc = useDebounce(valueLogging, 2000);
    //
    // const searchPackBouncing = (text: string) => {
    //     onChangeSearchValue(text);
    //     // setTextSearch(text);
    //     // debouncedFunc(text);
    // };
    //
    // const searchPackSend = () => {
    //     props.searchPacks();
    //     dispatch(searchPacks(textSearch));
    // };
    //
    // const onChangeRange = (newValue: [number, number]) => {
    //     changeRangeValue(newValue);
    //     debouncedFunc(newValue);
    // };

    //Рома

    const onChangeHandler = (value: string) => {
        setTextSearch(value);
    }

    const onChangeRange = (newValue: [number, number]) => {
        changeRangeValue(newValue);
    };

    const searchPackSend = () => {
        searchPacks(textSearch);
    }


    return (
        <div>
            <label className={s.packsAsideTitle} htmlFor="fieldSearch">Search</label>
            <div className={s.searchBlock}>
                <SuperInputText
                    className={s.searchInput}
                    placeholder='Search pack name'
                    onChangeText={onChangeHandler}
                    id="fieldSearch"
                    value={textSearch}
                />
            </div>
            <h3 className={s.packsAsideTitle}>Number of cards</h3>
            <div className={s.wrapSlider}>
                <Slider
                    range
                    className={s.range}
                    min={minValueRange}
                    max={maxValueRange}
                    defaultValue={[0, 50]}
                    step={stepRange}
                    onChange={onChangeRange}
                    value={rangeValue}

                    handleStyle={[{background: '#9A91C8', borderColor: '#9A91C8'}, {
                        background: '#9A91C8',
                        borderColor: '#9A91C8'
                    }]}
                    trackStyle={[{background: '#9A91C8'}]}
                />

                <div className={s.minAndMaxValue}>
                    <span>Min:{rangeValue[0]}</span>
                    <span>Max:{rangeValue[1]}</span>
                </div>

            </div>
            <SuperButton className={s.searchButton} onClick={searchPackSend}>Search</SuperButton>
        </div>
    )
};

type SearchPackPropsType = {
    changeRangeValue: (value: [number, number]) => void
    rangeValue: [number, number]
    searchPacks: (value: string) => void
    searchValue: string
    onChangeSearchValue: (value: string) => void
}