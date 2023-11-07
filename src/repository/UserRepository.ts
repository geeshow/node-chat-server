import {BaseEntity, BaseRepository} from "./BaseRepository";

export interface User extends BaseEntity {
    id: string;
    emoji: string;
    nickname: string;
    lastLogin: Date;
}

export class UserRepository extends BaseRepository<User> {
    constructor() {
        super();
    }
}
