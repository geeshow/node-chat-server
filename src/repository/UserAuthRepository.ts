import {BaseEntity, BaseRepository} from "./BaseRepository";

export interface UserAuth extends BaseEntity {
    id: string;
    password: string;
}

export class UserAuthRepository extends BaseRepository<UserAuth> {
    constructor() {
        super();
    }

    public findOneByPassword(password: string) {
        return this.findOne('password', password);
    }
}
