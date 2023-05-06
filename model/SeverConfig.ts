
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
        clientId: "8acae33a-68bf-479c-97ff-a75ee2615edd",        // 应用程序的 clientId
        clientSecret: "hyx8Q~uvgquzXHdr~XUWCp6SNyuqMPEmR8ZL_c-7",// 应用程序的 clientSecret
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