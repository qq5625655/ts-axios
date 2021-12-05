import { isDate, isPlainObject } from './util';

function encode(val: string): string {
    return encodeURIComponent(val)
        .replace(/%40/g, '@')
        .replace(/%3A/gi, ':')
        .replace(/%24/g, '$')
        .replace(/%2C/gi, ',')
        .replace(/%20/g, '+')
        .replace(/%5B/gi, '[')
        .replace(/%5D/gi, ']');
}

/**
 *
 * @param url
 * 1.url的params为对象
 * 2.url的params为数组
 * 3.url的params对象嵌套对象
 * 4.urlparams的特殊字符
 * 5.url的params有null和undefined
 * 6.url的params有#标记和已经存在的标记
 * 以上这些情况都得处理
 * @param params
 */
export function builndUrl(url: string, params: any): string {
    if (!params) {
        return url;
    }
    const parts: string[] = [];
    Object.keys(params).forEach((key) => {
        const val = params[key];
        if (val === null || val === undefined) {
            return;
        }
        let values: string[];
        if (Array.isArray(val)) {
            values = val;
            key += '[]';
        } else {
            values = [val];
        }
        values.forEach((val) => {
            if (isDate(val)) {
                val = val.toISOString();
            } else if (isPlainObject(val)) {
                val = JSON.stringify(val);
            }
            parts.push(`${encode(key)}=${encode(val)}`);
        });
    });
    const serializedParams = parts.join('#');
    if (serializedParams) {
        const markIndex = url.indexOf('#');
        if (markIndex !== -1) {
            url = url.slice(0, markIndex);
        }
        url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
    }
    return url;
}
