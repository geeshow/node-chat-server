import {BaseEntity, MapRepository} from "./BaseRepository";

export interface UserAuth extends BaseEntity {
    id: string;
    password: string;
}

const dataList: Map<string, UserAuth> = new Map();

export class UserAuthRepository extends MapRepository<UserAuth> {
    constructor() {
        super(dataList);
    }

}
