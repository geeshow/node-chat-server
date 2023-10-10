import {User} from "./UserRepository";

export interface BaseEntity {
    id: string;
    createdAt: Date;
    updatedAt: Date;
}

export class MapRepository<T> {
    private list: Map<string, T>;
    constructor(list: Map<string, T>) {
        this.list = list;
    }

    async findOneById(id: string): Promise<T | undefined> {
        return this.list.get(id);
    }

    async create(data: BaseEntity): Promise<T> {
        if (this.list.has(data.id)) {
            throw new Error('Already exist data');
        } else {
            this.list.set(data.id, data as T);
        }
        return data as T;
    }

    async update(data: BaseEntity): Promise<T> {
        if (this.list.has(data.id)) {
            this.list.set(data.id, data as T);
        } else {
            throw new Error('Not exist data');
        }
        return data as T;
    }

    async listAll(): Promise<Array<T>> {
        const entries = this.list.entries()
        const result = []
        for (const [key, value] of entries) {
            result.push(value)
        }
        return result
    }
}
