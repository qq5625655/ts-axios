import { buildURL } from '../helpers/url';
import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types';
// import { transformRequest } from '../helpers/data';
import { flattenHeaders } from '../helpers/headers';
import transform from './transform';
import xhr from './xhr';
import { combineURL, isAbsoluteURL } from '../helpers/util';

function dispatchRequest(config: AxiosRequestConfig): AxiosPromise {
    throwIfCancellationRequested(config);

    processConfig(config);
    return xhr(config).then((res) => {
        return transformResponseData(res);
    });
}
function processConfig(config: AxiosRequestConfig): void {
    config.url = transformUrl(config);
    // config.headers = transformHeaders(config);
    // config.data = transformRequestData(config);
    config.data = transform(
        config.data,
        config.headers,
        config.transformRequest,
    );

    config.headers = flattenHeaders(config.headers, config.method!);
}
function transformUrl(config: AxiosRequestConfig): string {
    let { url } = config;
    const { params, paramsSerializer, baseURL } = config;
    if (baseURL && !isAbsoluteURL(url!)) {
        url = combineURL(baseURL, url);
    }
    return buildURL(url!, params, paramsSerializer);
}
// function transformRequestData(config: AxiosRequestConfig): any {
//     return transformRequest(config.data);
// }

// function transformHeaders(config: AxiosRequestConfig) {
//     const { headers = {}, data } = config;
//     return processHeaders(headers, data);
// }
function transformResponseData(res: AxiosResponse): AxiosResponse {
    // res.data = transformResponse(res.data);
    // return res;
    res.data = transform(res.data, res.headers, res.config.transformResponse);
    return res;
}
function throwIfCancellationRequested(config: AxiosRequestConfig): void {
    if (config.cancelToken) {
        config.cancelToken.throwIfRequested();
    }
}
export default dispatchRequest;
