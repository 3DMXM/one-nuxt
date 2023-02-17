
export const useConfig = defineStore('config', {
    state: () => ({
        MySqlConfig: {
            "pan": {
                host: 'localhost',                                       // 数据库地址
                user: 'root',                                            // 数据库用户名
                password: '123456',                                      // 数据库密码
                database: 'pan',                                         // 数据库名
                timezone: "08:00",                                       // 时区
            },
            "game": {
                host: 'localhost',                                       // 数据库地址
                user: 'root',                                            // 数据库用户名
                password: '123456',                                      // 数据库密码
                database: 'game',                                        // 数据库名
                timezone: "08:00",                                       // 时区
            }
        },
        token: {
            // scopes:'Files.ReadWrite.All profile openid email',      // 请求的范围
            scopes: ['Files.ReadWrite.All', 'Files.Read.All', 'User.Read', 'offline_access'],      // 请求的范围
            clientId: "9ed0b3ca-497d-43b4-a693-1506e19ee3ef",        // 应用程序的 clientId
            clientSecret: "MCf8Q~460v2bWba2ge8qIjTSiziGYzOOyUib.aOk",// 应用程序的 clientSecret
            authority: "https://login.microsoftonline.com/common",   // 应用程序的 authority
            redirectUri: "http://localhost:3001/init/redirect",      // 应用程序的 redirectUri
            accessToken: "",                                         // 应用程序的 accessToken
        },
        configName: "pan" as 'pan' | 'game',
        onedrive_root: "/public"
    })
})