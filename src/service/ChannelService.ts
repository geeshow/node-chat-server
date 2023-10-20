import {
    ChannelDto, UserDto
} from "../dto/DefaultDto";
import {Channel, ChannelRepository} from "../repository/ChannelRepository";
import {User, UserRepository} from "../repository/UserRepository";
import {RequestCreateChannel, RequestJoinChannel, RequestLeaveChannel, RequestViewChannel} from "../dto/RequestDto";
import {MyChannel, MyChannelRepository} from "../repository/MyChannelRepository";


class ChannelService {
    userRepository: UserRepository = new UserRepository();
    channelRepository: ChannelRepository = new ChannelRepository();
    myChannelRepository: MyChannelRepository = new MyChannelRepository();

    public createChannel(myInfo: User, channelName: string) {
        const channelId = myInfo.id + Date.now();
        const channel = this.channelRepository.findOneById(channelId)
        if (channel) {
            throw new Error('Channel. already exists');
        } else {
            const newChannel = {
                id: channelId,
                channelName: channelName,
                hostUserId: myInfo.id,
                userIdList: [myInfo.id],
            } as Channel
            this.channelRepository.create(newChannel);

            this.myChannelRepository.create({
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
    public joinChannel(myInfo: User, channelId: string) {
        const channel = this.channelRepository.findOneById(channelId)
        if (!channel) {
            throw new Error('Channel data not found. Cannot join channel')
        } else {
            this.myChannelRepository.create({
                id: myInfo.id + Date.now(),
                userId: myInfo.id,
                channelId: channelId
            } as MyChannel);
            channel.userIdList.push(myInfo.id)
            return channel
        }
    }

    public leaveChannel(myInfo: User | null, payload: RequestLeaveChannel) {
        if (myInfo === null)
            throw new Error('myInfo is null. Cannot leave channel')

        const channel = this.channelRepository.findOneById(payload.channelId)
        if (!channel) {
            throw new Error('Channel data not found. Cannot leave channel')
        } else {
            const host = this.userRepository.findOneById(channel.hostUserId)
            const index = channel.userIdList.indexOf(myInfo.id)
            if (index > -1) {
                channel.userIdList.splice(index, 1)
            }
            this.myChannelRepository.deleteOne('channelId', payload.channelId)

            return {
                id: channel.id,
                channelName: channel.channelName,
                host: host as UserDto
            } as ChannelDto
        }
    }

    public getAllChannelList(): ChannelDto[] {
        const list = this.channelRepository.listAll()
        const result = []
        for (let i = 0; i < list.length; i++) {
            result.push(
                this.bindChannel(list[i])
            )
        }
        return result as ChannelDto[]
    }
    public getMyChannelList(user: User): ChannelDto[] {
        const myChannelIds = this.myChannelRepository.find('userId', user.id)
        const list = this.channelRepository.listByIds(myChannelIds.map((myChannel) => myChannel.channelId))
        const result = []
        for (let i = 0; i < list.length; i++) {
            result.push(
                this.bindChannel(list[i])
            )
        }
        return result as ChannelDto[]
    }

    private bindChannel(channel: Channel) {
        const host = this.userRepository.findOneById(channel.hostUserId)
        if (!host) {
            throw new Error('Host not found')
        }
        return {
            id: channel.id,
            channelName: channel.channelName,
            host: host as UserDto
        }
    }
    public getChannelWithUserList(channelId: string) {
        const channel = this.channelRepository.findOneById(channelId)
        if (!channel) {
            throw new Error('Channel data not found. Cannot get channel with user list');
        }
        const host = this.userRepository.findOneById(channel.hostUserId)
        if (!host) {
            throw new Error('Host not found')
        }
        const userList = [] as UserDto[]
        for (let i = 0; i < channel.userIdList.length; i++) {
            const userId = channel.userIdList[i];
            const user = this.userRepository.findOneById(userId)
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
    public getChannel(channelId: string) {
        const channel = this.channelRepository.findOneById(channelId)
        if (!channel) {
            throw new Error('Channel data not found. Cannot get channel')
        }
        return channel
    }
}

export default ChannelService;
