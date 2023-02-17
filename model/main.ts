export function GetNowTime() {
    let now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth() + 1;
    let day = now.getDate();
    let hour = now.getHours();
    let minute = now.getMinutes();
    let second = now.getSeconds();
    let time = year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
    return time;
}