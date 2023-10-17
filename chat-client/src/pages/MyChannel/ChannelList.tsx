import React, {useContext, useEffect, useState} from 'react';
import WebSocketContext, {WebSocketContextType} from "../../WebSocketProvider";
import {useRecoilState, useRecoilValue, useSetRecoilState} from "recoil";
import {channelCurrentIdState, channelListState, isLoginState, userState} from "../../store/recoilState";
import UserCard from "../../components/UserCard";
import EmojiSelector from "../../components/EmojiSelector";
import {useNavigate} from "react-router-dom";
import ChannelCard from "../../components/ChannelCard";


const ChannelList = () => {
    const { ChannelList, ChannelCreate } = useContext(WebSocketContext) as WebSocketContextType;
    const channelList = useRecoilValue(channelListState);
    const setChannelCurrentId = useSetRecoilState(channelCurrentIdState);

    useEffect(() => {
        ChannelList();
    }, []);

    const selectChannel = (channelId: string) => {
        setChannelCurrentId(channelId);
    }

    const renderChannelList = () => {
        return channelList.map((channel) => {
            return (
                <ChannelCard channel={channel} view={(channelId: string) => selectChannel(channelId)}/>
            )
        });
    }
    return (
        <section className={'common-section'}>
            { renderChannelList() }
        </section>
    );
};

export default ChannelList;
