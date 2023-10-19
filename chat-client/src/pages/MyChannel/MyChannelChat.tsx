import React, {useEffect} from 'react';
import {useRecoilValue} from "recoil";
import {channelCurrentIdState} from "../../store/recoilState";
import {useNavigate} from "react-router-dom";

interface ChannelViewProps {
    channelId: string;
}
const MyChannelChat:React.FC<ChannelViewProps> = ({ channelId }) => {
    const navigate = useNavigate();
    const channelCurrentId = useRecoilValue(channelCurrentIdState);

    useEffect(() => {
        console.log('channelId', channelId)
        if (channelId !== '') {
        }
    }, [channelId]);

    return (
        <section className={'common-section'}>
        </section>
    );
};

export default MyChannelChat;
