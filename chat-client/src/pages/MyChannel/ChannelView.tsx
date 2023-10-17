import React, {useContext, useEffect, useState} from 'react';
import WebSocketContext, {WebSocketContextType} from "../../WebSocketProvider";
import {useRecoilState, useRecoilValue} from "recoil";
import {channelCurrentIdState, isLoginState, userState} from "../../store/recoilState";
import UserCard from "../../components/UserCard";
import EmojiSelector from "../../components/EmojiSelector";
import {useNavigate} from "react-router-dom";


const ChannelView = () => {
    const navigate = useNavigate();
    const channelCurrentId = useRecoilValue(channelCurrentIdState);

    useEffect(() => {
        alert(channelCurrentId);
    }, [channelCurrentId]);

    return (
        <section className={'common-section'}>
        </section>
    );
};

export default ChannelView;
