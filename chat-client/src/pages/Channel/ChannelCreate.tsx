import React, {useContext, useEffect, useState} from 'react';
import WebSocketContext from "../../websocket/WebSocketProvider";
import {WebSocketContextType} from "../../websocket/WebSocketContextType";

const ChannelCreate = () => {
    const [channelName, setChannelName] = useState('');
    const { WSChannelCreate } = useContext(WebSocketContext) as WebSocketContextType;

    useEffect(() => {
        // ChannelList();
        console.log('ChannelCreate')
    }, []);
    const requestCreateChannel = () => {
        if (channelName === '') {
            alert('Input channel name');
            return;
        }
        WSChannelCreate(channelName);
    }

    return (
        <section className={'common-section flex'}>
            <input className={'common-input'} type="text" placeholder="Channel name" onChange={(event) => {
                setChannelName(event.target.value);
            }} />
            <button className={'common-btn px-4 ml-2'} type="submit" onClick={requestCreateChannel}>Create</button>
        </section>
    );
};

export default ChannelCreate;
