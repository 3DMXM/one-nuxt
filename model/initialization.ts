import { SeverConfig } from '@/model/SeverConfig'
import { GetToken } from '@/server/OneDrive/cache'

export function initialization() {
    let token = SeverConfig.token
    if (token.accessToken === "") {
        console.log('开始初始化!!!')

        // console.log(process.env);


        GetToken((err, res) => {
            if (!err && res.length > 0) {
                console.log(res);

                token.accessToken = res[0].accessToken;
                token.refreshToken = res[0].refreshToken;
                token.expiresOn = res[0].expiresOn;
                console.log("初始化完成!!!");

            } else {
                console.log("初始化失败:", err);
            }
        })
    }
    let time = new Date().getTime();
    let expiresOn = token.expiresOn * 1000;
    let expiresOnTime = new Date(expiresOn).getTime();
    console.log("initialzation:", time, expiresOnTime);

    if (expiresOnTime != 0 && time > expiresOnTime) {
        console.log("token过期,重新更新!!!");
        GetToken((err, res) => {
            if (!err && res.length > 0) {
                token.accessToken = res[0].accessToken;
                token.refreshToken = res[0].refreshToken;
                token.expiresOn = res[0].expiresOn;
                console.log("Token更新完成!!!");

            } else {
                console.log("Token更新失败:", err);
            }
        })
    }
}