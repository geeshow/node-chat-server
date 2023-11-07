import {BaseEntity, IRepository} from "../BaseRepository";

export class LocalMap<T> implements IRepository<T> {
    static dataSet: Map<string, any> = new Map<string, any>();
    private dataList: Map<string, T>;

    constructor(repositoryName: string) {
        if (LocalMap.dataSet.has(repositoryName)) {
            this.dataList = LocalMap.dataSet.get(repositoryName);
        } else {
            this.dataList = new Map<string, T>();
            LocalMap.dataSet.set(repositoryName, this.dataList);
        }
    }

    findOneById(id: string): T | null {
        return this.dataList.get(id) ?? null;
    }

    create(data: BaseEntity): T {
        if (this.dataList.has(data.id)) {
            throw new Error('Already exist data');
        } else {
            this.dataList.set(data.id, data as T);
        }
        return data as T;
    }
    delete(id: string): T {
        if (this.dataList.has(id)) {
            const data = this.dataList.get(id)
            this.dataList.delete(id)
            return data as T
        } else {
            throw new Error('Not exist data');
        }
    }

    update(data: BaseEntity): T {
        if (this.dataList.has(data.id)) {
            this.dataList.set(data.id, data as T);
        } else {
            throw new Error('Not exist data');
        }
        return data as T;
    }

    listAll(): Array<T> {
        const entries = this.dataList.entries()
        const result = []
        for (const [key, value] of entries) {
            result.push(value)
        }
        return result
    }
    listByIds(ids: string[]): Array<T> {
        const entries = this.dataList.entries() as any
        const result = []
        for (const [key, value] of entries) {
            if (ids.includes(value.id)) {
                result.push(value)
            }
        }
        return result
    }

    list(filter: any): Array<T> {
        const entries = this.dataList.entries()
        const result = []
        for (const [key, value] of entries) {
            if (filter(value)) {
                result.push(value)
            }
        }
        return result
    }

    findOne(findKey: string, findValue: string): T | null {
        const entries = this.dataList.entries() as any
        for (const [key, value] of entries) {
            if (value[findKey] === findValue) {
                return value;
            }
        }
        return null
    }
    find(findKey: string, findValue: string): Array<T> {
        const entries = this.dataList.entries() as any
        const result = []
        for (const [key, value] of entries) {
            if (value[findKey] === findValue) {
                result.push(value)
            }
        }
        return result
    }

    deleteOne(findKey: string, findValue: string): T | null {
        const entries = this.dataList.entries() as any
        for (const [key, value] of entries) {
            if (value[findKey] === findValue) {
                this.dataList.delete(key)
                return value;
            }
        }
        return null
    }
}
