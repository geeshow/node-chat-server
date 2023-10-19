import {
    ChannelDto, UserDto
} from "../dto/DefaultDto";
import {Channel, ChannelRepository} from "../repository/ChannelRepository";
import {User, UserRepository} from "../repository/UserRepository";
import {RequestCreateChannel, RequestJoinChannel, RequestLeaveChannel, RequestViewChannel} from "../dto/RequestDto";


class ChannelService {
    userRepository: UserRepository = new UserRepository();
    channelRepository: ChannelRepository = new ChannelRepository();

    public async createChannel(myInfo: User, channelName: string) {
        const channelId = myInfo.id + Date.now();
        const channel = await this.channelRepository.findOneById(channelId)
        if (channel) {
            throw new Error('Channel. already exists');
        } else {
            const newChannel = {
                id: channelId,
                channelName: channelName,
                hostUserId: myInfo.id,
                userIdList: [myInfo.id],
            } as Channel
            await this.channelRepository.create(newChannel);

            return {
                id: channelId,
                channelName: channelName,
                host: myInfo as UserDto
            } as ChannelDto
        }
    }
    public async joinChannel(myInfo: User, channelId: string) {
        const channel = await this.channelRepository.findOneById(channelId)
        if (!channel) {
            throw new Error('Channel data not found. Cannot join channel')
        } else {
            channel.userIdList.push(myInfo.id)
            return channel
        }
    }

    public async leaveChannel(myInfo: User | null, payload: RequestLeaveChannel) {
        if (myInfo === null)
            throw new Error('myInfo is null. Cannot leave channel')

        const channel = await this.channelRepository.findOneById(payload.channelId)
        if (!channel) {
            throw new Error('Channel data not found. Cannot leave channel')
        } else {
            const host = await this.userRepository.findOneById(channel.hostUserId)
            const index = channel.userIdList.indexOf(myInfo.id)
            if (index > -1) {
                channel.userIdList.splice(index, 1)
            }
            return {
                id: channel.id,
                channelName: channel.channelName,
                host: host as UserDto
            } as ChannelDto
        }
    }

    public async getAllChannelList(): Promise<ChannelDto[]> {
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
                channelName: channel.channelName,
                host: host as UserDto
            })
        }
        return result as ChannelDto[]
    }
    public async getChannelWithUserList(channelId: string) {
        const channel = await this.channelRepository.findOneById(channelId)
        if (!channel) {
            throw new Error('Channel data not found. Cannot get channel with user list');
        }
        const host = await this.userRepository.findOneById(channel.hostUserId)
        if (!host) {
            throw new Error('Host not found')
        }
        const userList = [] as UserDto[]
        for (let i = 0; i < channel.userIdList.length; i++) {
            const userId = channel.userIdList[i];
            const user = await this.userRepository.findOneById(userId)
            if (!user) {
                throw new Error('User not found')
            }
            userList.push(user as UserDto)
        }

        return {
            channel: {
                id: channel.id,
                channelName: channel.channelName,
                host: host as UserDto
            } as ChannelDto,
            userList: userList as UserDto[]
        }
    }
    public async getChannel(channelId: string) {
        const channel = await this.channelRepository.findOneById(channelId)
        if (!channel) {
            throw new Error('Channel data not found. Cannot get channel')
        }
        return channel
    }
}

export default ChannelService;
