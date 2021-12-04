export function isDate(val: any) {
    return Object.prototype.toString.call(val) === '[object Date]';
}
export function isObject(val: any) {
    return val !== null && typeof val === 'object';
}
