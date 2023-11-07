import {LocalMap} from "./drive/LocalMap";
import {RedisDB} from "./drive/RedisDB";

export interface BaseEntity {
    id: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface IRepository<T> {
    findOneById(id: string): Promise<T | null>;
    create(data: BaseEntity): Promise<T>;
    delete(id: string): Promise<T>;
    update(data: BaseEntity): Promise<T>;
    listAll(): Promise<Array<T>>;
    listByIds(ids: string[]): Promise<Array<T>>;
    list(filter: any): Promise<Array<T>>;
    findOne(findKey: string, findValue: string): Promise<T | null>;
    find(findKey: string, findValue: string): Promise<Array<T>>;
    deleteOne(findKey: string, findValue: string): Promise<T | null>;
}

export class BaseRepository<T> implements IRepository<T> {
    private drive: LocalMap<T> | RedisDB<T>;

    constructor() {
        if (process.env.DB_DRIVER === 'REDIS')
            this.drive = new RedisDB<T>(this.constructor.name)
        else
            this.drive = new LocalMap<T>(this.constructor.name)
    }

    async findOneById(id: string): Promise<T | null> {
        return await this.drive.findOneById(id)
    }

    async create(data: BaseEntity): Promise<T> {
        return await this.drive.create(data)
    }
    async delete(id: string): Promise<T> {
        return await this.drive.delete(id)
    }

    async update(data: BaseEntity): Promise<T> {
        return await this.drive.update(data)
    }

    async listAll(): Promise<Array<T>> {
        return await this.drive.listAll()
    }
    async listByIds(ids: string[]): Promise<Array<T>> {
        return await this.drive.listByIds(ids)
    }

    async list(filter: any): Promise<Array<T>> {
        return await this.drive.list(filter)
    }

    async findOne(findKey: string, findValue: string): Promise<T | null> {
        return await this.drive.findOne(findKey, findValue)
    }
    async find(findKey: string, findValue: string): Promise<Array<T>> {
        return await this.drive.find(findKey, findValue)
    }

    async deleteOne(findKey: string, findValue: string): Promise<T | null> {
        return await this.drive.deleteOne(findKey, findValue)
    }
}
