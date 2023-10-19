import React, {useContext, useEffect} from 'react';
import WebSocketContext from "../../websocket/WebSocketProvider";
import {useRecoilValue, useSetRecoilState} from "recoil";
import {channelCurrentIdState, myChannelListState} from "../../store/recoilState";
import ChannelCard from "../../components/ChannelCard";
import {WebSocketContextType} from "../../websocket/WebSocketContextType";


const MyChannelList = () => {
    const { WSMyChannelList } = useContext(WebSocketContext) as WebSocketContextType;
    const myChannelList = useRecoilValue(myChannelListState);
    const setChannelCurrentId = useSetRecoilState(channelCurrentIdState);

    useEffect(() => {
        WSMyChannelList();
    }, []);

    console.log('myChannelList', myChannelList);
    const selectChannel = (channelId: string) => {
        setChannelCurrentId(channelId);
    }

    const renderChannelList = () => {
        return myChannelList.map((channel) => {
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
