import {BaseEntity, MapRepository} from "./BaseRepository";
import {User} from "./UserRepository";

export interface Channel extends BaseEntity {
    id: string;
    channelName: string;
    userIdList: string[];
    hostUserId: string;
}

const userList: Map<string, Channel> = new Map();

export class ChannelRepository extends MapRepository<Channel> {
    constructor() {
        super(userList);
    }
}
