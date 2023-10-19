import React, {useContext, useEffect} from 'react';
import WebSocketContext from "../../websocket/WebSocketProvider";
import {useRecoilValue} from "recoil";
import {channelCurrentIdState} from "../../store/recoilState";
import {useNavigate} from "react-router-dom";
import {WebSocketContextType} from "../../websocket/WebSocketContextType";


const ChannelView = () => {
    const navigate = useNavigate();
    const { WSChannelView } = useContext(WebSocketContext) as WebSocketContextType;
    const channelCurrentId = useRecoilValue(channelCurrentIdState);

    useEffect(() => {
        console.log('channelCurrentId', channelCurrentId)
        if (channelCurrentId !== '') {
            WSChannelView(channelCurrentId);
        }
    }, [channelCurrentId]);

    return (
        <section className={'common-section'}>
        </section>
    );
};

export default ChannelView;
