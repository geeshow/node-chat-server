export interface BaseEntity {
    id: string;
    createdAt: Date;
    updatedAt: Date;
}

export class MapRepository<T> {
    private dataList: Map<string, T>;

    constructor(dataList: Map<string, T>) {
        this.dataList = dataList as Map<string, T>;
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

    findOne(key: string, findValue: string): T | null {
        const entries = this.dataList.entries() as any
        for (const [key, value] of entries) {
            if (value[key] === findValue) {
                return value;
            }
        }
        return null
    }
}
