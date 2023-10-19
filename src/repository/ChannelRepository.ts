import {BaseEntity, MapRepository} from "./BaseRepository";
import {User} from "./UserRepository";

export interface Channel extends BaseEntity {
    id: string;
    channelName: string;
    userIdList: string[];
    hostUserId: string;
}

const dataList = new Map();

export class ChannelRepository extends MapRepository<Channel> {
    constructor() {
        super(dataList);
    }
}
