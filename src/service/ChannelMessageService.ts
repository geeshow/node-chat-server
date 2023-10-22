import {
    MessageDto,
} from "../dto/DefaultDto";
import {User} from "../repository/UserRepository";
import {ChannelMessageRepository} from "../repository/ChannelMessageRepository";

class ChannelService {
    channelMessageRepository: ChannelMessageRepository = new ChannelMessageRepository();

    public createChannelMessage(channelId: string, user: User, channelName: string) {
        const createMessage = {
            channelId: channelId,
            type: 'CREATE_CHANNEL',
            content: `${user.emoji} ${user.nickname} has created the channel '${channelName}'`,
            userId: user.id,
            date: new Date(),
        } as MessageDto
        this.channelMessageRepository.init(createMessage)
        return createMessage
    }

    public joinChannelMessage(user: User, channelId: string) {
        const joinMessage = {
            channelId: channelId,
            type: 'JOIN_CHANNEL',
            content: `${user.emoji} ${user.nickname} has joined the channel`,
            userId: user.id,
        } as MessageDto
        this.channelMessageRepository.createMessage(joinMessage)
        return joinMessage
    }
    public getMessageFrom(channelId: string, fromMessageId: string, limit: number) {
        return this.channelMessageRepository.nextMessage({
            channelId: channelId,
            fromMessageId: fromMessageId,
            limit: limit
        })
    }

    public leaveChannelMessage(user: User, channelId: string) {
        const leaveMessage = {
            channelId: channelId,
            type: 'LEAVE_CHANNEL',
            content: `${user.emoji} ${user.nickname} has left the channel`,
            userId: user.id,
        } as MessageDto
        this.channelMessageRepository.createMessage(leaveMessage)
        return leaveMessage
    }

    public addMessageChannel(user: User, channelId: string, message: string) {
        const newMessage = {
            channelId: channelId,
            type: 'MESSAGE',
            content: message,
            userId: user.id,
            date: new Date(),
        } as MessageDto
        this.channelMessageRepository.createMessage(newMessage)

        return newMessage
    }
}

export default ChannelService;
