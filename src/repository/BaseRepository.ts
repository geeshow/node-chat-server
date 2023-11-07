import {LocalMap} from "./drive/LocalMap";

export interface BaseEntity {
    id: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface IRepository<T> {
    findOneById(id: string): T | null;
    create(data: BaseEntity): T;
    delete(id: string): T;
    update(data: BaseEntity): T;
    listAll(): Array<T>;
    listByIds(ids: string[]): Array<T>;
    list(filter: any): Array<T>;
    findOne(findKey: string, findValue: string): T | null;
    find(findKey: string, findValue: string): Array<T>;
    deleteOne(findKey: string, findValue: string): T | null;
}

export class BaseRepository<T> implements IRepository<T> {
    private drive: LocalMap<T>;

    constructor() {
        this.drive = new LocalMap<T>()
    }

    findOneById(id: string): T | null {
        return this.drive.findOneById(id)
    }

    create(data: BaseEntity): T {
        return this.drive.create(data)
    }
    delete(id: string): T {
        return this.drive.delete(id)
    }

    update(data: BaseEntity): T {
        return this.drive.update(data)
    }

    listAll(): Array<T> {
        return this.drive.listAll()
    }
    listByIds(ids: string[]): Array<T> {
        return this.drive.listByIds(ids)
    }

    list(filter: any): Array<T> {
        return this.drive.list(filter)
    }

    findOne(findKey: string, findValue: string): T | null {
        return this.drive.findOne(findKey, findValue)
    }
    find(findKey: string, findValue: string): Array<T> {
        return this.drive.find(findKey, findValue)
    }

    deleteOne(findKey: string, findValue: string): T | null {
        return this.drive.deleteOne(findKey, findValue)
    }
}
