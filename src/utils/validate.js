// 验证手机号
export function checkPhone(phone) {
    return /^1(3|4|5|6|7|8|9)\d{9}$/.test(phone)
}
// 验证姓名
export function checkName(name) {
    return /^[\u4E00-\u9FA5]{2,4}$/.test(name)
}
// 验证身份证号
export function checkIdCard(name) {
    return /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(name)
}

// 邀请码
export function inviteCodeLimit(name) {
    return /^[a-z0-9]{5,5}$/.test(name)
}