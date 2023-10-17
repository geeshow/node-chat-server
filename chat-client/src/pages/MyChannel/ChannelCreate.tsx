import React, {useContext, useState} from 'react';
import styled from 'styled-components';
import WebSocketContext, {WebSocketContextType} from "../../WebSocketProvider";

const ChannelCreate = () => {
    const [channelName, setChannelName] = useState('');
    const { ChannelCreate } = useContext(WebSocketContext) as WebSocketContextType;

    const requestCreateChannel = () => {
        if (channelName === '') {
            alert('Input channel name');
            return;
        }
        ChannelCreate(channelName);
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
