import {BaseEntity, BaseRepository} from "./BaseRepository";

export interface UserAuth extends BaseEntity {
    id: string;
    password: string;
}

export class UserAuthRepository extends BaseRepository<UserAuth> {
    constructor() {
        super();
    }
}
