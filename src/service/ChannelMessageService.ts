import {
    MessageDto,
} from "../dto/DefaultDto";
import {User} from "../repository/UserRepository";
import {ChannelMessageRepository} from "../repository/ChannelMessageRepository";

class ChannelService {
    channelMessageRepository: ChannelMessageRepository = new ChannelMessageRepository();

    public async createChannelMessage(channelId: string, user: User, channelName: string) {
        const createMessage = {
            channelId: channelId,
            type: 'CREATE_CHANNEL',
            content: `${user.emoji} ${user.nickname} has created the channel '${channelName}'`,
            userId: user.id,
            date: new Date(),
        } as MessageDto
        await this.channelMessageRepository.init(createMessage)
        return createMessage
    }

    public async joinChannelMessage(user: User, channelId: string) {
        const joinMessage = {
            channelId: channelId,
            type: 'JOIN_CHANNEL',
            content: `${user.emoji} ${user.nickname} has joined the channel`,
            userId: user.id,
        } as MessageDto
        await this.channelMessageRepository.createMessage(joinMessage)
        return joinMessage
    }
    public async getMessageFrom(channelId: string, fromMessageId: string, limit: number) {
        return this.channelMessageRepository.nextMessage({
            channelId: channelId,
            fromMessageId: fromMessageId,
            limit: limit
        })
    }

    public async leaveChannelMessage(user: User, channelId: string) {
        const leaveMessage = {
            channelId: channelId,
            type: 'LEAVE_CHANNEL',
            content: `${user.emoji} ${user.nickname} has left the channel`,
            userId: user.id,
        } as MessageDto
        await this.channelMessageRepository.createMessage(leaveMessage)
        return leaveMessage
    }

    public async addMessageChannel(user: User, channelId: string, message: string) {
        const newMessage = {
            channelId: channelId,
            type: 'MESSAGE',
            content: message,
            userId: user.id,
        } as MessageDto
        await this.channelMessageRepository.createMessage(newMessage)

        return newMessage
    }
}

export default ChannelService;
