import {ChannelDto} from "../../../src/dto/DefaultDto";

interface ChannelProps {
    channel: ChannelDto;
    view: (channelId: string) => void;
}
const ChannelCard: React.FC<ChannelProps> = ({ channel, view}) => {
    return (
        <div className="mb-2 py-2 px-2 max-w-full w-full mx-auto bg-white rounded-xl shadow-lg sm:flex sm:items-center sm:space-y-0 sm:space-x-6">
            <div className="flex justify-between w-full text-center space-y-2 sm:text-left">
                <div className="space-y-0.5">
                    <p className="text-lg text-black font-semibold">
                        {channel.channelName}
                    </p>
                    <p className="text-slate-500 font-medium">
                        by {channel.host.nickname}
                        <span className="text-2xl">
                            {channel.host.emoji}
                        </span>
                    </p>
                </div>
                <button className={'common-btn px-4'} type="submit" onClick={() => view(channel.id)}>View</button>
            </div>
        </div>
    )
}
export default ChannelCard;
