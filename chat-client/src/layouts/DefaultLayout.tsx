import React, {ReactNode, Suspense} from 'react';
import {Route, Routes, useLocation} from "react-router-dom";
import MyInfo from "../pages/MyInfo";
import TopMenu from "../components/TopMenu";

function DefaultLayout(parent: { children: ReactNode }) {
    const location = useLocation();

    return (
        <div>
            <div className='app'>
                <div className='app-top'>
                    <TopMenu currentPath={location.pathname} />
                </div>
                <div className='app-content'>
                    {parent.children}
                </div>
            </div>
        </div>
    );
}

export default DefaultLayout;
