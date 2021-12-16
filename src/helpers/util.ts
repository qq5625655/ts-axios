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
export function isFormData(val: any): boolean {
    return typeof val !== 'undefined' && val instanceof FormData;
}

export function isURLSearchParams(val: any): val is URLSearchParams {
    return typeof val !== 'undefined' && val instanceof URLSearchParams;
}

export function isAbsoluteURL(url: string): boolean {
    // eslint-disable-next-line
    return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
}

export function combineURL(baseURL: string, relativeURL?: string): string {
    return relativeURL
        ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
        : baseURL;
}
