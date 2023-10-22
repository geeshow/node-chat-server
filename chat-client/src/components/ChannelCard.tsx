import {ChannelDto} from "../../../src/dto/DefaultDto";

interface ChannelProps {
    channel: ChannelDto;
    view: (channelId: string) => void;
}
const ChannelCard: React.FC<ChannelProps> = ({ channel, view}) => {
    return (
        <div className="mb-2 py-2 px-2 max-w-full w-full mx-auto bg-white rounded-xl sm:flex sm:items-center sm:space-y-0 sm:space-x-6
         hover:shadow-lg transition duration-200 ease-in-out transform hover:-translate-y-1 hover:scale-110
         cursor-pointer"
             onClick={() => view(channel.id)}
        >
            <div className="flex justify-between w-full text-center space-y-2 sm:text-left">
                <div className="space-y-0.5">
                    <p className="text-lg text-black font-semibold">
                        <span className="text-2xl"># </span>
                        <span className="text-2xl">{channel.channelName}</span>
                        <span className="text-slate-500 font-medium"> by {channel.host.nickname}</span>
                        <span className="text-2xl">{channel.host.emoji}</span>
                    </p>
                </div>
            </div>
        </div>
    )
}
export default ChannelCard;
