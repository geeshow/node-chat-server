import React, {useContext, useState} from 'react';
import WebSocketContext, {WebSocketContextType} from "../../WebSocketProvider";
import {useRecoilState, useRecoilValue} from "recoil";
import {isLoginState, userState} from "../../store/recoilState";
import UserCard from "../../components/UserCard";
import EmojiSelector from "../../components/EmojiSelector";
import {useNavigate} from "react-router-dom";


const MyInfoForm = () => {
    const navigate = useNavigate();
    const [user, setUser] = useRecoilState(userState);

    const changeUserInfo = () => {
        navigate('/my-info/change');
    }

    return (
        <section className={'common-section'}>
            <UserCard user={user} />
            <div>
                <button className={'common-btn px-12 mt-2'} type="submit" onClick={changeUserInfo}>Change Nickname & Emoji</button>
            </div>
        </section>
    );
};

export default MyInfoForm;
