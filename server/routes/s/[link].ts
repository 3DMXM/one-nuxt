import { GetLink } from '@/server/model/link'

export default defineEventHandler(async (event) => {

    let short_link = event.context.params?.link

    if (short_link == undefined) {
        // 返回404
        setResponseStatus(404, '未找到相关地址')
        return {
            code: '404',
            msg: "未找到相关地址"
        }
    }

    let link = await GetLink(short_link)

    let long_link = link[0].long_link

    // 302 跳转到 long_link
    setResponseStatus(event, 302)
    setHeader(event, 'Location', long_link)

    return {
        code: '302',
        link: event.context.params?.link,
        long_link: link[0].long_link
    }
})