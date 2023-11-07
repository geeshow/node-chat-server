import {BaseEntity, IRepository} from "../BaseRepository";
import Redis from 'ioredis';

// Redis 클라이언트 설정

export class RedisDB<T> implements IRepository<T> {
    static redisClient : Redis| null = null;
    private readonly group: string;

    constructor(repositoryName: string) {
        this.group = repositoryName;

        if (RedisDB.redisClient === null) {
            RedisDB.redisClient = new Redis({
                host: process.env.REDIS_HOST,
                port: Number(process.env.REDIS_PORT),
                password: process.env.REDIS_PASSWORD,
                db: Number(process.env.REDIS_DB),
            });

// Redis 연결 에러 처리
            RedisDB.redisClient.on('error', (err) => {
                console.error('Redis error:', err);
            });

// Redis 연결 성공 처리
            RedisDB.redisClient.on('connect', () => {
                console.log('Connected to Redis');
            });
        }
    }

    async findOneById(id: string): Promise<T | null> {
        const data = await RedisDB.redisClient!.get(`${this.group}:${id}`);
        if (data)
            return JSON.parse(data) as T;
        return null;
    }

    async create(data: BaseEntity): Promise<T> {
        const exists = await RedisDB.redisClient!.exists(`${this.group}:${data.id}`)
        if (exists) {
            throw new Error('Already exist data');
        } else {
            await RedisDB.redisClient!.set(`${this.group}:${data.id}`, JSON.stringify(data));
            await RedisDB.redisClient!.rpush(this.group, data.id);
        }
        return data as T;
    }
    async delete(id: string): Promise<T> {
        const data = await this.findOneById(id)
        if (data) {
            await RedisDB.redisClient!.del(`${this.group}:${id}`);
            return data as T
        } else {
            throw new Error('Not exist data');
        }
    }
    async update(data: BaseEntity): Promise<T> {
        const rowData = await this.findOneById(data.id)
        if (rowData) {
            await RedisDB.redisClient!.set(`${this.group}:${data.id}`, JSON.stringify(data));
        } else {
            throw new Error('Not exist data');
        }
        return rowData as T;
    }

    async listAll(): Promise<Array<T>> {
        const entries = await RedisDB.redisClient!.lrange(this.group, 0, -1);
        const result: Array<T> = []
        for (const id of entries) {
            const rowData = await this.findOneById(id)
            result.push(rowData as T)
        }
        return result
    }
    async listByIds(ids: string[]): Promise<Array<T>> {
        const result: Array<T> = []
        for (const id of ids) {
            const data = await this.findOneById(id)
            if (data) {
                result.push(data)
            }
        }
        return result
    }

    async list(filter: any): Promise<Array<T>> {
        const entries = await RedisDB.redisClient!.lrange(this.group, 0, -1);
        const result: Array<T> = []
        for (const id of entries) {
            const rowData = await this.findOneById(id)

            if (filter(rowData)) {
                result.push(rowData as T)
            }
        }
        return result
    }

    async findOne(findKey: string, findValue: string): Promise<T | null> {
        const entries = await RedisDB.redisClient!.lrange(this.group, 0, -1);
        for (const id of entries) {
            const rowData = await this.findOneById(id) as any
            if (rowData && rowData[findKey] === findValue) {
                return rowData
            }
        }
        return null
    }
    async find(findKey: string, findValue: string): Promise<Array<T>> {
        const entries = await RedisDB.redisClient!.lrange(this.group, 0, -1);
        const result: Array<T> = []
        for (const id of entries) {
            const rowData = await this.findOneById(id) as any
            if (rowData && rowData[findKey] === findValue) {
                result.push(rowData)
            }
        }
        return result
    }

    async deleteOne(findKey: string, findValue: string): Promise<T | null> {
        const data: any = await this.findOne(findKey, findValue)
        if (data) {
            await this.delete(data.id)
        }
        return data
    }
}
