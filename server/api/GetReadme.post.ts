import { GetFileData } from '@/server/OneDrive/onedrive'
import { Cache } from '@/server/OneDrive/cache'
// import { kv } from "@vercel/kv";

export default defineEventHandler(async (event) => {

    const { fid } = await readBody(event)

    console.log("fid:", fid);


    let data = await Cache.get(fid);
    if (!data) {
        console.log(`没有内容, 重新获取`);
        data = await GetFileData(fid)
    }

    // console.log(`data:`, data);


    return {
        code: '00',
        msg: "获取成功",
        data: data
    }
})