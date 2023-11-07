import {BaseEntity, IRepository} from "../BaseRepository";

export class LocalMap<T> implements IRepository<T> {
    static dataSet: Map<string, any> = new Map<string, any>();
    readonly dataList: Map<string, T>;

    constructor(repositoryName: string) {
        if (LocalMap.dataSet.has(repositoryName)) {
            this.dataList = LocalMap.dataSet.get(repositoryName);
        } else {
            this.dataList = new Map<string, T>();
            LocalMap.dataSet.set(repositoryName, this.dataList);
        }
    }

    async findOneById(id: string): Promise<T | null> {
        return await this.dataList.get(id) ?? null;
    }

    async create(data: BaseEntity): Promise<T> {
        if (this.dataList.has(data.id)) {
            throw new Error('Already exist data');
        } else {
            this.dataList.set(data.id, data as T);
        }
        return data as T;
    }
    async delete(id: string): Promise<T> {
        if (this.dataList.has(id)) {
            const data = this.dataList.get(id)
            this.dataList.delete(id)
            return data as T
        } else {
            throw new Error('Not exist data');
        }
    }

    async update(data: BaseEntity): Promise<T> {
        if (this.dataList.has(data.id)) {
            this.dataList.set(data.id, data as T);
        } else {
            throw new Error('Not exist data');
        }
        return data as T;
    }

    async listAll(): Promise<Array<T>> {
        const entries = this.dataList.entries()
        const result = []
        for (const [, value] of entries) {
            result.push(value)
        }
        return result
    }
    async listByIds(ids: string[]): Promise<Array<T>> {
        const entries = this.dataList.entries() as any
        const result = []
        for (const [, value] of entries) {
            if (ids.includes(value.id)) {
                result.push(value)
            }
        }
        return result
    }

    async list(filter: any): Promise<Array<T>> {
        const entries = this.dataList.entries()
        const result = []
        for (const [, value] of entries) {
            if (filter(value)) {
                result.push(value)
            }
        }
        return result
    }

    async findOne(findKey: string, findValue: string): Promise<T | null> {
        const entries = this.dataList.entries() as any
        for (const [, value] of entries) {
            if (value[findKey] === findValue) {
                return value;
            }
        }
        return null
    }
    async find(findKey: string, findValue: string): Promise<Array<T>> {
        const entries = this.dataList.entries() as any
        const result = []
        for (const [, value] of entries) {
            if (value[findKey] === findValue) {
                result.push(value)
            }
        }
        return result
    }

    async deleteOne(findKey: string, findValue: string): Promise<T | null> {
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
