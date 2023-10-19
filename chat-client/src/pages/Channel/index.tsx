import React, {useEffect} from 'react';
import ChannelView from "./ChannelView";
import ChannelList from "./ChannelList";
import ChannelCreate from "./ChannelCreate";

const Channel = () => {
    return (
        <div className={'common-page'}>
            <div className={'flex flex-row'}>
                <div className={'flex flex-col mr-3 w-96 h-96'}>
                    <ChannelList />
                    <ChannelCreate />
                </div>
                <div className={'w-96 h-96'}>
                    <ChannelView />
                </div>
            </div>
        </div>
    );
};

export default Channel;
