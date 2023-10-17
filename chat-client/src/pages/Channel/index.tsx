import React from 'react';
import MyChannelList from "./MyChannelList";
import MyChannelChat from "./MyChannelChat";

const MyChannel = () => {
    return (
        <div className={'common-page'}>
            <div className={'flex flex-row'}>
                <MyChannelList />
                <MyChannelChat />
            </div>
        </div>
    );
};

export default MyChannel;
