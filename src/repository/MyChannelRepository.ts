import {BaseEntity, MapRepository} from "./BaseRepository";
import {User} from "./UserRepository";

export interface MyChannel extends BaseEntity {
    id: string;
    userId: string;
    channelId: string;
}

const dataList = new Map();

export class MyChannelRepository extends MapRepository<MyChannel> {
    constructor() {
        super(dataList);
    }
}
