import {
    ChannelDto, UserDto
} from "../dto/DefaultDto";
import {Channel, ChannelRepository} from "../repository/ChannelRepository";
import {User, UserRepository} from "../repository/UserRepository";
import {MyChannel, MyChannelRepository} from "../repository/MyChannelRepository";


class ChannelService {
    userRepository: UserRepository = new UserRepository();
    channelRepository: ChannelRepository = new ChannelRepository();
    myChannelRepository: MyChannelRepository = new MyChannelRepository();

    public getMyChannelId(userId: string, channelId: string) {
        return `${userId}_${channelId}`;
    }
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

            await this.myChannelRepository.create({
                id: myInfo.id + Date.now(),
                userId: myInfo.id,
                channelId: channelId
            } as MyChannel);

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
            if (channel.userIdList.indexOf(myInfo.id) > -1) {
                throw new Error('Already joined channel')
            }
            await this.myChannelRepository.create({
                id: this.getMyChannelId(myInfo.id, channelId),
                userId: myInfo.id,
                channelId: channelId
            } as MyChannel);

            channel.userIdList.push(myInfo.id)
            await this.channelRepository.update(channel)

            return channel
        }
    }

    public async leaveChannel(myInfo: User | null, channelId: string) {
        if (myInfo === null)
            throw new Error('myInfo is null. Cannot leave channel')

        const channel = await this.channelRepository.findOneById(channelId)
        if (!channel) {
            throw new Error('Channel data not found. Cannot leave channel')
        } else {
            const host = await this.userRepository.findOneById(channel.hostUserId)
            const index = channel.userIdList.indexOf(myInfo.id)
            if (index > -1) {
                channel.userIdList.splice(index, 1)
            }
            const myChannelId = this.getMyChannelId(myInfo.id, channelId)
            await this.myChannelRepository.delete(myChannelId)

            return {
                id: channel.id,
                channelName: channel.channelName,
                host: host as UserDto
            } as ChannelDto
        }
    }

    public async getAllChannelList() {
        const list = await this.channelRepository.listAll()
        const result = []
        for (let i = 0; i < list.length; i++) {
            result.push(
                await this.bindChannel(list[i])
            )
        }
        return result as ChannelDto[]
    }
    public async getMyChannelList(user: User) {
        const myChannelIds = await this.myChannelRepository.find('userId', user.id)
        const list = await this.channelRepository.listByIds(myChannelIds.map((myChannel) => myChannel.channelId))
        const result = []
        for (let i = 0; i < list.length; i++) {
            result.push(
                await this.bindChannel(list[i])
            )
        }
        return result as ChannelDto[]
    }

    private async bindChannel(channel: Channel) {
        const host = await this.userRepository.findOneById(channel.hostUserId)
        if (!host) {
            throw new Error('Host not found')
        }
        return {
            id: channel.id,
            channelName: channel.channelName,
            host: host as UserDto
        }
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
