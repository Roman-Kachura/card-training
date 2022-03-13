import styles from "../newPassword/NewPassword.module.css";
import SuperInputText from "../../components/SuperInputText/SuperInputText";
import React, {useState} from "react";
import {useDebounce} from "../../hooks/useDebounce";
import {searchCards} from "./search-reducer";
import SuperButton from "../../components/SuperButton/SuperButton";
import {useDispatch} from "react-redux";
import {Slider} from "antd";
import 'antd/dist/antd.css';


export const Search = () => {
    const dispatch = useDispatch();
    const [textSearch, setTextSearch] = useState<string>("");
    const minValueRange = 0;
    const maxValueRange = 40;
    const stepRange = 1;
    const [valueRange, setValueRange] = useState<[number, number]>([0, 40]);

    function valueLogging(value:any) {
        dispatch(searchCards(value));
    }

    const debouncedFunc = useDebounce(valueLogging, 2000);

    const searchPackBouncing = (text: string) => {
        setTextSearch(text);
        debouncedFunc(text);
    };

    const searchPackSend = () => {
        dispatch(searchCards(textSearch));
    };

    const onChangeRange = (newValue: [number, number]) => {
        setValueRange(newValue);
        debouncedFunc(newValue);
    };
    const wrapSlider = {
        width: "200px"
    };


    return (
      <div>
          <label className={styles.labelInput} htmlFor="fieldSearch">Search</label>
          <SuperInputText onChangeText={searchPackBouncing} id="fieldSearch"/>
          <SuperButton onClick={searchPackSend} type="submit">Search</SuperButton>
          <div style={wrapSlider}>
              <Slider range min={minValueRange} max={maxValueRange}
                      defaultValue={[0, 50]}
                      step={stepRange}
                      onChange={onChangeRange}
                      value={valueRange}/>
          </div>
      </div>
  )
};