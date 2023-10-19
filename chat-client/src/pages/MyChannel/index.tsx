import React from 'react';
import MyChannelList from "./MyChannelList";
import MyChannelChat from "./MyChannelChat";
import {useParams} from "react-router-dom";

const MyChannel = () => {
    const { channelId } = useParams();
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
