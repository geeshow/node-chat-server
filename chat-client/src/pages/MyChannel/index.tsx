import React from 'react';
import ChannelView from "./ChannelView";
import ChannelList from "./ChannelList";
import ChannelCreate from "./ChannelCreate";

const Channel = () => {
    return (
        <div className={'common-page'}>
            <div className={'flex flex-row'}>
                <div className={'flex flex-col'}>
                    <ChannelList />
                    <ChannelCreate />
                </div>
                <ChannelView />
            </div>
        </div>
    );
};

export default Channel;
