import { _GetFileData } from '@/server/OneDrive/cache'

export default defineEventHandler(async (event) => {

    // let { file_id } = req.body;
    const { fid } = await readBody(event)

    let data = await _GetFileData(fid)


    return {
        code: '00',
        msg: "获取成功",
        data: data
    }
})