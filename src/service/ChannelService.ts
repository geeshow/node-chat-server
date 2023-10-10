import {RequestCreate} from "../dto/ChannelDto";
import {Channel, ChannelRepository} from "../repository/ChannelRepository";
import {User} from "../repository/UserRepository";


class ChannelService {
    channelRepository: ChannelRepository = new ChannelRepository();

    public async createChannel(myInfo: User | null, payload: RequestCreate) {
        if (myInfo === null)
            throw new Error('myInfo is null')

        const channelId = myInfo.id + Date.now();
        const channel = await this.channelRepository.findOneById(channelId)
        if (channel) {
            throw new Error('Channel already exists');
        } else {
            const newChannel = {
                id: channelId,
                title: payload.title,
                host: myInfo,
                userList: [myInfo],
            } as Channel
            await this.channelRepository.create(newChannel);
            return newChannel
        }
    }

    public async getAllChannelList() {
        return await this.channelRepository.listAll()
    }

}

export default ChannelService;
