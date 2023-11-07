import {BaseEntity, BaseRepository} from "./BaseRepository";

export interface MessageItem {
    id: string;
    type: string;
    content: string;
    userId: string;
    date: Date;
}

export interface ChannelMessage extends BaseEntity {
    message: [MessageItem]
}

export class ChannelMessageRepository extends BaseRepository<ChannelMessage> {
    constructor() {
        super();
    }

    public async init(payload: {channelId: string, type: string, content: string, userId: string}) {
        const createMessage = {
            id: payload.channelId,
            message: [{
                id: payload.channelId + Date.now(),
                type: payload.type,
                content: payload.content,
                userId: payload.userId,
            }]
        } as ChannelMessage
        await this.create(createMessage)

        return createMessage
    }

    public async createMessage(payload: {channelId: string, type: string, content: string, userId: string}) {
        const channelMessage = await this.findOneById(payload.channelId)
        if (!channelMessage) {
            throw new Error('Channel. not found')
        }

        const newMessage = {
            id: payload.channelId + Date.now(),
            type: payload.type,
            content: payload.content,
            userId: payload.userId,
            date: new Date(),
        } as MessageItem
        channelMessage.message.push(newMessage)
        await this.update(channelMessage)

        return newMessage
    }

    async lastMessage(payload: { channelId: string, limit: number}) {
        const channelMessage = await this.findOneById(payload.channelId)
        if (channelMessage) {
            const result = []
            const message = channelMessage.message
            for (let i = message.length - 1; i >= 0; i--) {
                result.push(message[i])
                if (result.length === payload.limit) {
                    break
                }
            }
            return result
        }
        return []
    }
    async nextMessage(payload: { channelId: string, fromMessageId: string, limit: number}) {
        const channelMessage = await this.findOneById(payload.channelId)
        if (channelMessage) {
            const result = []
            for (const message of channelMessage.message) {
                if (message.id > payload.fromMessageId) {
                    result.push(message)
                }
                if (result.length === payload.limit) {
                    break
                }
            }
            return result
        }
        return []
    }

    async prevMessage(payload: { channelId: string, fromMessageId: string, limit: number}) {
        const channelMessage = await this.findOneById(payload.channelId)
        if (channelMessage) {
            const result = []
            for (const message of channelMessage.message) {
                if (message.id < payload.fromMessageId) {
                    result.push(message)
                }
                if (result.length === payload.limit) {
                    break
                }
            }
            return result
        }
        return []
    }
}
