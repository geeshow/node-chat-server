import {BaseEntity, MapRepository} from "./BaseRepository";

export interface User extends BaseEntity {
    id: string;
    emoji: string;
    nickname: string;
    lastLogin: Date;
}
const dataList = new Map();

export class UserRepository extends MapRepository<User> {
    constructor() {
        super(dataList);
    }

}
