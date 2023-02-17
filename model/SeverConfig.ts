
// console.log(process.env);


export let SeverConfig = {
    MySqlConfig: {
        host: process.env.mysql_host,
        user: process.env.mysql_user,
        password: process.env.mysql_password,
        database: process.env.mysql_database,
        timezone: process.env.mysql_timezone,
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
    configName: "pan" as 'pan' | 'game',
    onedrive_root: process.env.onedrive_root || '/public'
}