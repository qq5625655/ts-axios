export function isDate(val: any): val is Date {
    return Object.prototype.toString.call(val) === '[object Date]';
}
export function isObject(val: any) {
    return val !== null && typeof val === 'object';
}
export function isPlainObject(val: any) {
    return Object.prototype.toString.call(val) === '[object Object]';
}

export function extend<T, U>(to: T, from: U): T & U {
    for (const key in from) {
        (to as T & U)[key] = from[key] as any;
    }
    return to as T & U;
}
export function deepMerge(...objs: any[]): any {
    const result = Object.create(null);

    for (let i = 0; i < objs.length; i++) {
        const obj = objs[i];
        for (const key in obj) {
            assignValue(obj[key], key);
        }
    }

    function assignValue(val: any, key: string) {
        if (isObject(result[key]) && isObject(val)) {
            result[key] = deepMerge(result[key], val);
        } else if (isObject(val)) {
            result[key] = deepMerge({}, val);
        } else {
            result[key] = val;
        }
    }
    return result;
}
