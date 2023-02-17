import fconnection from '@/server/model/mysql'
import { ILink } from '@/model/Interfaces'


// 获取短链列表
export async function GetLinkList() {
    const connection = fconnection()
    return new Promise<ILink[]>((resolve, reject) => {
        connection.query("select * from link", function (err, result) {
            if (err) { reject(err) }
            resolve(result)
        })
    })

}

// 通过短链获取长链
export async function GetLink(short_link: string) {
    const connection = fconnection()
    return new Promise<ILink[]>((resolve, reject) => {
        connection.query("select * from link where short_link = ?", [short_link], function (err, result) {
            if (err) { reject(err) }
            resolve(result)
        })
    })
}

// 添加短链
export async function AddLink(short_link: string, long_link: string) {
    const connection = fconnection()
    return new Promise((resolve, reject) => {
        connection.query("insert into link(short_link, long_link, click_cot) values(?,?,?)", [short_link, long_link, 0], function (err, result) {
            if (err) { reject(err) }
            resolve(result)
        })
    })
}

// 编辑短链
export async function EditLink(short_link: string, long_link: string, click_cot: number, id: number) {
    const connection = fconnection()
    return new Promise((resolve, reject) => {
        connection.query("update link set short_link = ?, long_link = ?, click_cot = ? where id = ?", [short_link, long_link, click_cot, id], function (err, result) {
            if (err) { reject(err) }
            resolve(result)
        })
    })
}

// 统计点击
export async function ClickAdd(short_link: string) {
    const connection = fconnection()
    return new Promise((resolve, reject) => {
        connection.query("update link set click_cot = click_cot + 1 where short_link = ?", [short_link], function (err, result) {
            if (err) { reject(err) }
            resolve(result)
        })
    })
}