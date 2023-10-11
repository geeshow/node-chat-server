import {RequestCreateChannel, RequestViewChannel, ResponseChannel} from "../dto/ChannelDto";
import {Channel, ChannelRepository} from "../repository/ChannelRepository";
import {User, UserRepository} from "../repository/UserRepository";
import {ResponseUserInfo} from "../dto/UserDto";
import ChannelMessageService from "./ChannelMessageService";


class ChannelService {
    userRepository: UserRepository = new UserRepository();
    channelRepository: ChannelRepository = new ChannelRepository();

    public async createChannel(myInfo: User | null, payload: RequestCreateChannel) {
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
                hostUserId: myInfo.id,
                userIdList: [myInfo.id],
            } as Channel
            await this.channelRepository.create(newChannel);

            return newChannel
        }
    }

    public async getAllChannelList() {
        const list = await this.channelRepository.listAll()
        const result = []
        for (let i = 0; i < list.length; i++) {
            const channel = list[i];
            const host = await this.userRepository.findOneById(channel.hostUserId)
            if (!host) {
                throw new Error('Host not found')
            }
            result.push({
                id: channel.id,
                title: channel.title,
                host: host as ResponseUserInfo
            })
        }
        return { channelList: result as ResponseChannel[] }
    }
    public async getChannelWithUserList(payload: RequestViewChannel) {
        const channel = await this.channelRepository.findOneById(payload.channelId)
        if (!channel) {
            throw new Error('Channel not found')
        }
        const host = await this.userRepository.findOneById(channel.hostUserId)
        if (!host) {
            throw new Error('Host not found')
        }
        const userList = [] as ResponseUserInfo[]
        for (let i = 0; i < channel.userIdList.length; i++) {
            const userId = channel.userIdList[i];
            const user = await this.userRepository.findOneById(userId)
            if (!user) {
                throw new Error('User not found')
            }
            userList.push(user as ResponseUserInfo)
        }

        return {
            channel: {
                id: channel.id,
                title: channel.title,
                host: host as ResponseUserInfo
            } as ResponseChannel,
            userList: userList as ResponseUserInfo[]
        }
    }
    public async getChannel(channelId: string) {
        const channel = await this.channelRepository.findOneById(channelId)
        if (!channel) {
            throw new Error('Channel not found')
        }
        return channel
    }
}

export default ChannelService;
