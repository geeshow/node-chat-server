import {BaseEntity, BaseRepository} from "./BaseRepository";

export interface Channel extends BaseEntity {
    id: string;
    channelName: string;
    userIdList: string[];
    hostUserId: string;
}

export class ChannelRepository extends BaseRepository<Channel> {
    constructor() {
        super();
    }
}
