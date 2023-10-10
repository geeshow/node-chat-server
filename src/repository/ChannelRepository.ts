import {BaseEntity, MapRepository} from "./BaseRepository";
import {User} from "./UserRepository";

export interface Channel extends BaseEntity {
    id: string;
    title: string;
    userList: User[];
    host: User;
}

const userList: Map<string, Channel> = new Map();

export class ChannelRepository extends MapRepository<Channel> {
    constructor() {
        super(userList);
    }
}
