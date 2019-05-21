
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
