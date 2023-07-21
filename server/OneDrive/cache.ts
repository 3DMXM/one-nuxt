import { kv } from "@vercel/kv";

export class Cache {
    public static async set(key: string, value: any, opts: any = { ex: 60 * 60 * 1 }) {
        try {
            await kv.set(key, value, opts)
        } catch (error) {
            console.log(`error: ${error}`);
        }
    }

    public static async get(key: string) {
        // return kv.get<any[]>(key)
        try {
            let data = await kv.get<any[]>(key)
            return data
        } catch (error) {
            console.log(`error: ${error}`);
            return null
        }
    }
}