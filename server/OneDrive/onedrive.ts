
import request from 'request';
import { SeverConfig } from '@/model/SeverConfig'
import { GetNowTime } from '@/model/main'
import axios from 'axios'
import { kv } from "@vercel/kv";


const { token } = SeverConfig;


// 获取 RefreshToken
export async function GetRefreshToken(code: string) {
    const url = "https://login.microsoftonline.com/common/oauth2/token";
    const data = {
        grant_type: "authorization_code",
        client_id: token.clientId,
        client_secret: token.clientSecret,
        code: code,
        redirect_uri: token.redirectUri
    };

    return axios.post(url, data, {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    })
}

// 获取 AccessToken
export async function RefreshToken(refreshToken: string) {
    const url = "https://login.microsoftonline.com/common/oauth2/token";
    const options = {
        method: "POST",
        url: url,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        form: {
            grant_type: "refresh_token",
            client_id: token.clientId,
            client_secret: token.clientSecret,
            refresh_token: refreshToken,
            redirect_uri: token.redirectUri,
        }
    };

    return new Promise((resolve, reject) => {
        request(options, function (err, response, body) {
            if (!err) {
                let jsonData = JSON.parse(body);
                token.accessToken = jsonData.access_token;
                token.expires_on = jsonData.expires_on
                resolve(jsonData)
                // SaveToken(jsonData.access_token, jsonData.refresh_token, token.scopes, jsonData.expires_on, function (err2, result) {
                //     // console.log("result", jsonData);
                //     // callback(err2, [jsonData]);
                //     callback(err2, [{
                //         accessToken: jsonData.access_token,
                //         refreshToken: jsonData.refresh_token,
                //         expiresOn: jsonData.expires_on,
                //     }])
                // })
            } else {
                reject(err);
            }
        })
    })


}


// 获取文件列表
export async function GetChildren(path: string): Promise<any[]> {
    // 将 path 转换为url编码
    let UrlPath = encodeURIComponent(path);
    // 调用官方API
    const url = `https://graph.microsoft.com/v1.0/me/drive/root:${UrlPath}:/children?select=name,size,folder,@microsoft.graph.downloadUrl,lastModifiedDateTime,id`;
    const options = {
        method: "GET",
        url: url,
        headers: {
            "Authorization": `Bearer ${token.accessToken}`,
            "Content-Type": "application/x-www-form-urlencoded",
        },
    };


    return new Promise((resolve, reject) => {
        request(options, function (err, response, body) {
            if (!err) {
                let jsonData = JSON.parse(body);
                let ChildrenList: any[] = jsonData.value;
                // 只需要取 name、size、id、folder.childCount、lastModifiedDateTime
                let Children: any[] = [];
                if (ChildrenList?.length > 0) {
                    ChildrenList.forEach(function (item) {
                        let ext = null;
                        if (!item.folder) {
                            // 正则获取文件后缀
                            let reg = /\.([^\.]+)$/;
                            ext = reg.exec(item.name);
                            if (ext) {
                                ext = ext[1];
                            } else {
                                ext = "folder";
                            }
                        }
                        let child = {
                            file_fid: item.id,
                            file_parent: path,
                            file_name: item.name,
                            file_type: ext || "folder",
                            file_size: item.size,
                            file_downloadUrl: item['@microsoft.graph.downloadUrl'] || "",
                            childCount: item.folder || 0,
                            lastModifiedDateTime: new Date(item.lastModifiedDateTime),
                            file_up_time: GetNowTime(),
                        }
                        if (item.folder) {
                            child.childCount = item.folder.childCount;
                        }
                        Children.push(child);
                    });


                    // 写入缓存
                    kv.set(path, Children, {
                        // 2 小时
                        ex: 60 * 60 * 1
                    });

                    resolve(Children)
                } else {
                    resolve(Children);
                }
            } else {
                // callback(err, null);
                reject(err);
            }
        })

    })
}

// 获取文件数据
export async function GetFileData(file_id: string): Promise<any[]> {
    // 调用官方API
    const url = `https://graph.microsoft.com/v1.0/me/drive/items/${file_id}/content`;
    const options = {
        method: "GET",
        url: url,
        headers: {
            "Authorization": `Bearer ${token.accessToken}`,
            "Content-Type": "application/x-www-form-urlencoded",
        },
    };

    return new Promise((resolve, reject) => {
        request(options, function (err, response, body) {
            if (!err) {
                // 写入缓存
                kv.set(file_id, body);

                resolve(body)
            } else {
                reject(err);
            }
        })
    })


}


// // 获取OneDrive的Token
// export function GetRefreshToken(code: string, callback: ICallback) {
//     const url = "https://login.microsoftonline.com/common/oauth2/token";
//     const options = {
//         method: "POST",
//         url: url,
//         headers: {
//             "Content-Type": "application/x-www-form-urlencoded"
//         },
//         form: {
//             grant_type: "authorization_code",
//             client_id: token.clientId,
//             client_secret: token.clientSecret,
//             code: code,
//             redirect_uri: token.redirectUri
//         }
//     };

//     request(options, (err, res, body) => {
//         if (err) {
//             callback(err, null);
//         } else {
//             callback(null, JSON.parse(body));
//         }
//     });
// }

// // 刷新OneDrive的Token
// export function RefreshToken(refreshToken: string, callback: ICallback) {
//     const url = "https://login.microsoftonline.com/common/oauth2/token";
//     const options = {
//         method: "POST",
//         url: url,
//         headers: {
//             "Content-Type": "application/x-www-form-urlencoded"
//         },
//         form: {
//             grant_type: "refresh_token",
//             client_id: token.clientId,
//             client_secret: token.clientSecret,
//             refresh_token: refreshToken,
//             redirect_uri: token.redirectUri,
//         }
//     };

//     request(options, function (err, response, body) {
//         if (!err) {
//             let jsonData = JSON.parse(body);
//             token.accessToken = jsonData.access_token;
//             SaveToken(jsonData.access_token, jsonData.refresh_token, token.scopes, jsonData.expires_on, function (err2, result) {
//                 // console.log("result", jsonData);
//                 // callback(err2, [jsonData]);
//                 callback(err2, [{
//                     accessToken: jsonData.access_token,
//                     refreshToken: jsonData.refresh_token,
//                     expiresOn: jsonData.expires_on,
//                 }])
//             })
//         } else {
//             console.log(`RefreshToken:${err}`);
//             callback(err, null);
//         }
//     })
// }

// // 列出 driveItem 的子项
// export function GetChildren(path: string, callback: ICallback) {
//     // 将 path 转换为url编码
//     let UrlPath = encodeURIComponent(path);
//     // 调用官方API
//     const url = `https://graph.microsoft.com/v1.0/me/drive/root:${UrlPath}:/children?select=name,size,folder,@microsoft.graph.downloadUrl,lastModifiedDateTime,id`;
//     const options = {
//         method: "GET",
//         url: url,
//         headers: {
//             "Authorization": `Bearer ${token.accessToken}`,
//             "Content-Type": "application/x-www-form-urlencoded",
//         },
//     };
//     request(options, function (err, response, body) {
//         if (!err) {
//             let jsonData = JSON.parse(body);
//             let ChildrenList: any[] = jsonData.value;
//             // 只需要取 name、size、id、folder.childCount、lastModifiedDateTime
//             let Children: any[] = [];
//             if (ChildrenList?.length > 0) {
//                 // console.log(ChildrenList);

//                 ChildrenList.forEach(function (item) {
//                     let ext = null;
//                     if (!item.folder) {
//                         // 正则获取文件后缀
//                         let reg = /\.([^\.]+)$/;
//                         ext = reg.exec(item.name);
//                         if (ext) {
//                             ext = ext[1];
//                         } else {
//                             ext = "folder";
//                         }
//                     }
//                     let child = {
//                         file_fid: item.id,
//                         file_parent: path,
//                         file_name: item.name,
//                         file_type: ext || "folder",
//                         file_size: item.size,
//                         file_downloadUrl: item['@microsoft.graph.downloadUrl'] || "",
//                         childCount: item.folder || 0,
//                         lastModifiedDateTime: new Date(item.lastModifiedDateTime),
//                         file_up_time: GetNowTime(),
//                     }
//                     if (item.folder) {
//                         child.childCount = item.folder.childCount;
//                     }
//                     Children.push(child);
//                 });
//                 // console.log(ChildrenList);
//                 SaveFileList(Children, path, function (err, result) {
//                     callback(err, Children);
//                 })
//             } else {
//                 callback(jsonData, Children);
//             }
//         } else {
//             callback(err, null);
//         }
//     })
// }

// // 获取文件数据
// export function GetFileData(file_id: string, callback: ICallback) {
//     // 调用官方API
//     const url = `https://graph.microsoft.com/v1.0/me/drive/items/${file_id}/content`;
//     const options = {
//         method: "GET",
//         url: url,
//         headers: {
//             "Authorization": `Bearer ${token.accessToken}`,
//             "Content-Type": "application/x-www-form-urlencoded",
//         },
//     };
//     // console.log(`GetFileData请求:${url}`);
//     request(options, function (err, response, body) {
//         if (!err) {
//             SaveFileData(file_id, body, function (err, result) {
//                 callback(err, body);
//             })
//         } else {
//             callback(err, null);
//         }
//     })
// }
