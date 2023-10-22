import React, {useContext, useEffect} from 'react';
import MyChannelList from "./MyChannelList";
import MyChannelChat from "./MyChannelChat";
import {useParams} from "react-router-dom";
import WebSocketContext from "../../websocket/WebSocketProvider";
import {WebSocketContextType} from "../../websocket/WebSocketContextType";

const MyChannel = () => {
    const { channelId } = useParams();
    console.log('MyChannel', channelId)

    return (
        <div className={'common-page'}>
            <div className={'flex flex-row'}>
                <MyChannelList />
                { channelId && <MyChannelChat channelId={channelId} /> }
            </div>
        </div>
    );
};

export default MyChannel;
