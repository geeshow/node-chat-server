import {BaseEntity, BaseRepository} from "./BaseRepository";

export interface MyChannel extends BaseEntity {
    id: string;
    userId: string;
    channelId: string;
}

export class MyChannelRepository extends BaseRepository<MyChannel> {
    constructor() {
        super();
    }

    public async deleteMyChannel(userId: string, channelId: string) {
        const myChannel = await this.findOneById(userId + channelId);
        if (myChannel) {
            await this.delete(myChannel.id);
        }
    }
}
