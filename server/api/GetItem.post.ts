// /api/GetItem
import { SeverConfig } from '@/model/SeverConfig'
import { GetFileList } from '@/server/OneDrive/cache'
import { initialization } from '@/model/initialization'


export default defineEventHandler(async (event) => {
    const { path } = await readBody(event)

    initialization()

    let { onedrive_root } = SeverConfig

    let parent = onedrive_root
    if (path.length > 0) {
        parent += "/" + path.join("/")
    }

    console.log(parent);
    // console.log("accessToken", SeverConfig.token.accessToken);

    let item = await GetFileList(parent).catch((err) => {
        console.log(err);
        return []
    })

    return {
        code: '00',
        msg: "获取成功",
        items: item,
    }
})

