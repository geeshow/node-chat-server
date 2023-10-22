import React, {useContext, useState} from 'react';
import WebSocketContext from "../../websocket/WebSocketProvider";
import {useRecoilState, useRecoilValue} from "recoil";
import {isLoginState, userState} from "../../store/recoilState";
import UserCard from "../../components/UserCard";
import EmojiSelector from "../../components/EmojiSelector";
import {useNavigate} from "react-router-dom";
import useLocalStorage from "../../hooks/useLocalStorage";


const MyInfoForm = () => {
    const navigate = useNavigate();
    const [user, setUser] = useRecoilState(userState);
    const [, setToken] = useLocalStorage('token', '');

    const changeUserInfo = () => {
        navigate('/my-info/change');
    }

    const logout = () => {
        setToken('');
        setUser({
            id: '',
            nickname: '',
            emoji: '',
            lastLogin: new Date()
        });
    }

    return (
        <section className={'common-section'}>
            <UserCard user={user} />
            <div className={'flex justify-between mt-2'}>
                <button className={'common-btn px-12'} type="submit" onClick={changeUserInfo}>Change</button>
                <button className={'common-btn px-12 ml-2'} type="submit" onClick={logout}>Logout</button>
            </div>
        </section>
    );
};

export default MyInfoForm;
