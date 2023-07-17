
// console.log(process.env);

// console.log(process.env.site_siteName, process.env.onedrive_root);


export let SeverConfig = {
    token: {
        // scopes:'Files.ReadWrite.All profile openid email',       // 请求的范围
        scopes: ['Files.ReadWrite.All', 'Files.Read.All', 'User.Read', 'offline_access'],      // 请求的范围
        clientId: "8acae33a-68bf-479c-97ff-a75ee2615edd",           // 应用程序的 clientId
        clientSecret: "hyx8Q~uvgquzXHdr~XUWCp6SNyuqMPEmR8ZL_c-7",   // 应用程序的 clientSecret
        authority: "https://login.microsoftonline.com/common",      // 应用程序的 authority
        redirectUri: "http://localhost:3001/init/redirect",         // 应用程序的 redirectUri
        accessToken: "",                                            // 应用程序的 accessToken
        refreshToken: process?.env?.refreshToken || "",             // 应用程序的 refreshToken
        expires_on: 0,
    },
    siteName: process?.env?.site_siteName || '小莫的云网盘',
    onedrive_root: process?.env?.onedrive_root || '/public',
}