import React from 'react';
import {ChannelDto} from "../../../../src/dto/DefaultDto";

interface MyChannelTitleProps {
    channel: ChannelDto,
}
const MyChannelTitle:React.FC<MyChannelTitleProps> = ({ channel }) => {
    return (
        <>
            { channel &&
                <div>
                    <div className={'flex'}>
                        <h1 className={'font-bold text-2xl'}>{channel.channelName}</h1>
                    </div>
                </div>
            }
        </>
    );
};

export default MyChannelTitle;
