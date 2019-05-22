
declare let abp: any;

export function generateRandomString(length: number): string {
    return Math.random().toString(36).substr(2, length);
}
  
export function generatePassword(length: number = 15) {
    var charset = "abcdefghijklmnopqrstuvwxyz@#%^ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#%^&?[]{}",
        retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
}

export function generateUsername(length: number = 6) {
    var charset = "abcdefghijklmnopqrstuvwxyz",
        retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
}

export function buildObject(arr: any) {
    let obj = {};
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].key && arr[i].key.length > 0) {
            obj[arr[i].key] = arr[i].value;
        }
    }
    return obj;
}

export function buildArray(obj: any) {
    let arr = [];
    Object.keys(obj).forEach((key) => {
        arr.push({
            key: key,
            value: obj[key]
        });
    });
    return arr;
}

export function getHttpMethods() {
    return ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH", "CONNECT", "TRACE", "HEAD"];
}

export function getContentTypes() {
    return ["application/json; charset=utf-8", "application/x-www-form-urlencoded", "application/xml", "application/javascript", "text/xml", "text/plain", "text/html"];
}