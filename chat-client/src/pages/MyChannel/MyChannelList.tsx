import React, {useContext, useEffect} from 'react';
import WebSocketContext from "../../websocket/WebSocketProvider";
import {useRecoilValue, useSetRecoilState} from "recoil";
import {channelCurrentIdState, channelListState} from "../../store/recoilState";
import ChannelCard from "../../components/ChannelCard";
import {WebSocketContextType} from "../../websocket/WebSocketContextType";


const MyChannelList = () => {
    const { WSChannelList, WSChannelCreate } = useContext(WebSocketContext) as WebSocketContextType;
    const channelList = useRecoilValue(channelListState);
    const setChannelCurrentId = useSetRecoilState(channelCurrentIdState);

    useEffect(() => {
        WSChannelList();
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

export default MyChannelList;
