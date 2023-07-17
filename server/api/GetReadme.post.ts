import { GetFileData } from '@/server/OneDrive/onedrive'
import { kv } from "@vercel/kv";

export default defineEventHandler(async (event) => {

    const { fid } = await readBody(event)

    console.log("fid:", fid);


    let data = await kv.get<any[]>(fid);
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