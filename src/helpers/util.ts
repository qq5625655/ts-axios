export function isDate(val: any): val is Date {
    return Object.prototype.toString.call(val) === '[object Date]';
}
export function isObject(val: any) {
    return val !== null && typeof val === 'object';
}
export function isPlainObject(val: any) {
    return Object.prototype.toString.call(val) === '[object Object]';
}
