
// console.log(process.env);

// console.log(process.env.site_siteName, process.env.onedrive_root);


export let SeverConfig = {
    MySqlConfig: {
        "pan": {
            host: '127.0.0.1',
            user: 'pan',
            password: '123456',
            database: 'pan',
        },
        "game": {
            host: '127.0.0.1',
            user: 'game',
            password: '123456',
            database: 'game',
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
        refreshToken: "",
        expiresOn: 0,
    },
    configName: (process?.env?.config_Name || 'pan') as 'pan' | 'game',
    siteName: process?.env?.site_siteName || '小莫的云网盘',
    onedrive_root: process?.env?.onedrive_root || '/public',
}