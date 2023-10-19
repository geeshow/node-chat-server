import React, {useEffect} from 'react';
import ChannelView from "./ChannelView";
import ChannelList from "./ChannelList";
import ChannelCreate from "./ChannelCreate";
import {useParams} from "react-router-dom";

const Channel = () => {
    const { channelId } = useParams();
    console.log('channelId', channelId)

    return (
        <div className={'common-page'}>
            <div className={'flex flex-row'}>
                <div className={'flex flex-col mr-3 w-96 h-96'}>
                    <ChannelList />
                    <ChannelCreate />
                </div>
                <div className={'w-96 h-96'}>
                    { channelId && <ChannelView channelId={channelId} /> }
                </div>
            </div>
        </div>
    );
};

export default Channel;
