import React from 'react'
import s from './loading.module.css'

export const Loading = () => {
    return (<div>
        <div className={s.load}>
            <hr/>
            <hr/>
            <hr/>
            <hr/>
        </div>
        <div className={s.bg}></div>
    </div>)
}