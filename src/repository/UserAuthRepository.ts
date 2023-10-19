import {BaseEntity, MapRepository} from "./BaseRepository";

export interface UserAuth extends BaseEntity {
    id: string;
    password: string;
}

const dataList = new Map();

export class UserAuthRepository extends MapRepository<UserAuth> {
    constructor() {
        super(dataList);
    }

    public findOneByPassword(password: string) {
        return this.findOne('password', password);
    }
}
