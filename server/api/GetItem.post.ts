// /api/GetItem
import { SeverConfig } from '@/model/SeverConfig'
// import { GetFileList } from '@/server/OneDrive/cache'
import { GetChildren } from '@/server/OneDrive/onedrive'
import { initialization } from '@/model/initialization'
import { kv } from "@vercel/kv";


export default defineEventHandler(async (event: any) => {
    const { path } = await readBody(event)

    initialization()

    let { onedrive_root } = SeverConfig

    let parent = onedrive_root
    if (path.length > 0) {
        parent += "/" + path.join("/")
    }

    console.log("parent:", parent);

    let data = await kv.get<any[]>(parent);

    // let data = []
    if (!data) {
        console.log(`没有内容, 重新获取`);
        data = await GetChildren(parent)
    }

    // console.log(`data:`, data);

    return {
        code: '00',
        msg: "获取成功",
        items: data,
    }
})

