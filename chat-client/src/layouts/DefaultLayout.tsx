import React, {ReactNode, useEffect} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import TopMenu from "../components/TopMenu";
import {useRecoilValue} from "recoil";
import {isLoginState} from "../store/recoilState";

function DefaultLayout(parent: { children: ReactNode }) {
    const location = useLocation();
    const navigate = useNavigate();
    const isLogin = useRecoilValue(isLoginState);

    useEffect(() => {
        if (!isLogin && location.pathname !== '/') {
            navigate('/');
        }
    }, []);

    return (
        <div className='app h-screen'>
            <div className='app-top h-14'>
                <TopMenu currentPath={location.pathname} />
            </div>
            <div className='app-content h-5/6'>
                {parent.children}
            </div>
        </div>
    );
}

export default DefaultLayout;
