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

    public deleteMyChannel(userId: string, channelId: string) {
        const myChannel = this.findOneById(userId + channelId);
        if (myChannel) {
            this.delete(myChannel.id);
        }
    }
}
