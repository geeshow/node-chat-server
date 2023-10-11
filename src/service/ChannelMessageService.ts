import {
    RequestCreateChannel,
    RequestJoinChannel,
    RequestLeaveChannel,
    RequestSendMessageChannel
} from "../dto/ChannelDto";
import {User} from "../repository/UserRepository";
import {ChannelMessage, ChannelMessageRepository} from "../repository/ChannelMessageRepository";
import {ResponseUserInfo} from "../dto/UserDto";


class ChannelService {
    channelMessageRepository: ChannelMessageRepository = new ChannelMessageRepository();

    public async createChannelMessage(channelId: string, user: User, payload: RequestCreateChannel) {
        const createMessage = {
            id: channelId,
            message: [{
                id: channelId + Date.now(),
                type: 'CREATE_CHANNEL',
                content: `${user.emoji} ${user.nickname} has created the channel`,
                userId: user.id,
            }]
        } as ChannelMessage
        await this.channelMessageRepository.create(createMessage)
        return createMessage
    }

    public async joinChannelMessage(user: User, payload: RequestJoinChannel) {
        const joinMessage = {
            channelId: payload.channelId,
            type: 'JOIN_CHANNEL',
            content: `${user.emoji} ${user.nickname} has joined the channel`,
            userId: user.id,
        }
        await this.channelMessageRepository.createMessage(joinMessage)
        return joinMessage
    }
    public async getMessageListAtJoin(channelId: string, limit: number) {
        return this.channelMessageRepository.lastMessage({
            channelId: channelId,
            limit: limit
        })
    }

    public async leaveChannelMessage(user: User, payload: RequestLeaveChannel) {
        await this.channelMessageRepository.createMessage({
            channelId: payload.channelId,
            type: 'LEAVE_CHANNEL',
            content: `${user.emoji} ${user.nickname} has left the channel`,
            userId: user.id,
        })
    }

    public async addMessageChannel(user: User | null, payload: RequestSendMessageChannel) {
        if (user === null)
            throw new Error('myInfo is null')

        const newMessage = await this.channelMessageRepository.createMessage({
            channelId: payload.channelId,
            type: 'MESSAGE',
            content: payload.message,
            userId: user.id,
        })

        return {
            message: newMessage ,
            user: user as ResponseUserInfo,
        }
    }
}

export default ChannelService;
