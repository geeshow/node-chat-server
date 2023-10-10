import {BaseEntity, MapRepository} from "./BaseRepository";

export interface User extends BaseEntity {
    id: string;
    password: string;
    emoji: string;
    nickname: string;
    lastLogin: Date;
}

const dataList: Map<string, User> = new Map();

export class UserRepository extends MapRepository<User> {
    constructor() {
        super(dataList);
    }

}
