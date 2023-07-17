import { SeverConfig } from '@/model/SeverConfig'
import { RefreshToken } from '@/server/OneDrive/onedrive'

export function initialization() {

    // console.log("SeverConfig:", SeverConfig);

    let token = SeverConfig.token

    let time = new Date().getTime();
    let expires_on = token.expires_on * 1000;

    if ((!token.accessToken) || (expires_on != 0 && time > expires_on)) {
        console.log("token不存在或已过期, 重新更新!!!");
        RefreshToken(token.refreshToken).then((data) => {
            console.log('expires_on', token.expires_on);
        }).catch(err => {
            console.log(`err:`, err);
        })
    }

}