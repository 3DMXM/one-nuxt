
import fconnection from '@/server/model/mysql'
import { ICallback, IFileList } from '@/model/Interfaces';
import { RefreshToken, GetChildren, GetFileData } from '@/server/OneDrive/onedrive'
import { GetNowTime } from '@/model/main'


// 将token存储到数据库中
export function SaveToken(
    accessToken: string, refreshToken: string, scopes: string[], expiresOn: number, callback: ICallback
) {
    let time = GetNowTime();
    let scopesStr = scopes.join(" ");
    let sql = `select * from token`;
    let connection = fconnection()
    connection.query(sql, function (err, result: any) {
        if (!err && result.length > 0) {
            sql = `update token set accessToken = ?, scopes = ?, refreshToken = ?, time = ?, expiresOn = ? where id = 1`;
        } else {
            sql = `insert into token (accessToken, scopes, refreshToken, time, expiresOn) values (?,?,?,?,?)`;
        }
        connection.query(sql, [accessToken, scopesStr, refreshToken, time, expiresOn], function (err, result) {
            if (err) console.log(`SaveToken: ${err}`);
            callback(err, result);
        });
    });

    // connection.end()
}

// 从数据库获取OneDrive的Token
export function GetToken(callback: ICallback) {
    let sql = "select * from token";
    let connection = fconnection()
    connection.query(sql, function (err, result: any) {
        if (!err && result.length > 0 && result[0].refreshToken) {
            try {
                // 通过expiresOn判断是否过期 expiresOn 为 1655114196 格式            
                let time = new Date().getTime();
                let expiresOn = result[0].expiresOn * 1000;
                let expiresOnTime = new Date(expiresOn).getTime();
                if (time > expiresOnTime) {
                    console.log(`GetToken:数据过期，重新获取. time:${time} - expiresOnTime:${expiresOnTime}`);
                    // 如果过期了 调用RefreshToken方法重新获取Token
                    RefreshToken(result[0].refreshToken, function (err, jsonData) {
                        // console.log(jsonData);
                        // console.log("RefreshToken:", jsonData);
                        callback(err, jsonData);
                    })
                } else {
                    console.log(`GetToken:数据未过期，直接返回. time:${time} - expiresOnTime:${expiresOnTime}`);
                    // console.log("result:", result);
                    callback(null, result);
                }
            } catch (err2) {
                console.log(`GetToken-code-err: ${err2}`);
                callback(err2, result);
            }
        } else {
            console.log(`GetToken: ${err}`);
            callback(err, []);
        }
    })
    // connection.end()
}

// 将文件列表写入到数据库
export function SaveFileList(fileList: IFileList[], parent: string, callback: ICallback) {
    let sql = `delete from file_items where file_parent = ?`;
    let connection = fconnection()
    connection.query(sql, [parent], function (err, result) {
        if (err) {
            console.log(`SaveFileList: ${err}`);
            callback(err, result);
        } else {
            // 将 fileList 转换为数组
            let fileListArr: any[] = [];
            fileList.forEach(item => {
                fileListArr.push([item.file_fid, parent, item.file_name, item.file_type, item.file_size, item.file_downloadUrl, item.childCount, item.lastModifiedDateTime, GetNowTime()]);
            })

            let sql = `insert into file_items (file_fid, file_parent, file_name, file_type, file_size, file_downloadUrl, childCount, lastModifiedDateTime, file_up_time) values ?`;
            connection.query(sql, [fileListArr], function (err, result) {
                if (err) console.log(`SaveFileList: ${err}`);
                callback(err, fileList);
            })

        }
    })
    // connection.end()
}

// 从数据库获取文件列表
export async function GetFileList(parent: string) {
    // 查询 file_parent = parent 的数据
    let where = `where file_parent = '${parent}'`;
    let sql = `select * from file_items ${where}`;
    let connection = fconnection()
    return new Promise<IFileList[]>((resolve, reject) => {
        connection.query(sql, function (err, result: any) {
            if (result?.length > 0) {
                // 通过 file_up_time 判断是否过期 过期时间 2小时
                let time = new Date();
                let expiresOn = result[0].file_up_time;
                let expiresOnTime = new Date(expiresOn);
                let expiresOnTime2 = new Date(expiresOnTime.getTime() + 1 * 60 * 60 * 1000);
                console.log(`检查过期:time:${time} - expiresOnTime2 ${expiresOnTime2},结果：${time > expiresOnTime2}`);
                if (time > expiresOnTime2) {
                    console.log(`GetFileList:数据过期，重新获取. time:${time} - expiresOnTime:${expiresOnTime2}`);
                    // 如果过期了 调用GetChildren方法重新获取文件列表                
                    GetChildren(parent, function (err, ChildrenList) {
                        // 返回新获取的文件列表
                        // callback(err, ChildrenList)
                        if (err) resolve(result);
                        resolve(ChildrenList)

                    })
                } else {
                    // callback(err, result);
                    resolve(result)
                }
            } else {
                GetChildren(parent, function (err, ChildrenList) {
                    // callback(err, ChildrenList);
                    if (err) reject(err)
                    resolve(ChildrenList)
                })
            }
        })
    })

    // connection.end()
}

// 清空数据库中的文件列表
export function ClearFileList(parent: string, callback: ICallback) {
    // 清空 file_parent = parent 的数据
    let sql = `delete from file_items where file_parent = ?`;
    let connection = fconnection()
    connection.query(sql, [parent], function (err, result) {
        if (!err) {
            callback(null, result);
        } else {
            console.log(`ClearFileList: ${err}`);
            callback(err, result);
        }
    })
    // connection.end()
}

// 储存文件数据到数据库
export function SaveFileData(file_id: string, data: string, callback: ICallback) {
    /**
     * 更新file_data表,通过 file_id 判断,如果存在则更新，不存在则插入
     * file_data.file_fid = file_fid
     * file_data.file_data = data
     * file_data.file_time = GetNowTime()
     */
    let sql = `select * from file_data where file_fid = ?`;
    let connection = fconnection()
    connection.query(sql, [file_id], function (err, result: any) {
        if (result.length > 0) {
            // 更新
            let sql = `update file_data set file_data = ?, file_time = ? where file_fid = ?`;
            connection.query(sql, [data, GetNowTime(), file_id], function (err, result) {
                if (err) console.log(`SaveFile: ${err}`);
                callback(err, result);
            })
        } else {
            // 插入
            let sql = `insert into file_data (file_fid, file_data, file_time) values (?, ?, ?)`;
            connection.query(sql, [file_id, data, GetNowTime()], function (err, result) {
                if (err) console.log(`SaveFile: ${err}`);
                callback(err, result);
            })
        }
    })
    // connection.end()
}

// 从数据库读取文件数据
export async function _GetFileData(file_id: string) {
    let sql = `select * from file_data where file_fid = ?`;
    let connection = fconnection()
    return new Promise<string>((resolve, reject) => {
        connection.query(sql, [file_id], function (err, result: any) {
            if (result.length > 0) {
                // 通过 file_time 判断是否过期 过期时间 3天
                let time = new Date().getDate();
                let expiresOn = result[0].file_time;
                let expiresOnTime = new Date(expiresOn);
                let expiresOnTime2 = new Date(expiresOnTime.getTime() + 3 * 24 * 60 * 60 * 1000).getDate();
                if (time > expiresOnTime2) {
                    console.log(`GetFileData:数据过期，重新获取. time:${time} - expiresOnTime:${expiresOnTime2}`);
                    // 如果过期了 调用GetChildren方法重新获取文件列表
                    GetFileData(file_id, function (err, data) {
                        // 返回新获取的文件列表
                        // callback(err, data);
                        if (err) reject(err)
                        resolve(data)
                    })
                } else {
                    // callback(err, result[0].file_data);
                    if (err) reject(err)
                    resolve(result[0].file_data)

                }
            } else {
                GetFileData(file_id, function (err, data) {
                    // callback(err, data);
                    if (err) reject(err)
                    resolve(data)
                })

            }
        })
    })

    // connection.end()
}