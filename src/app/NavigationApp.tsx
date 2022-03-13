import React from "react";
import {Route, Routes} from "react-router-dom";
import { publicRoutes } from "../routes/routes";

export const NavigationApp = () => {
    return (
        <Routes>
            {publicRoutes.map(r => <Route key={r.path} path={r.path} element={'<' + r.component() + '/>'}/>)}
        </Routes>
    )
}