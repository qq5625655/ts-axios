import { builndUrl } from '../helpers/url';
import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types';
import { transformRequest, transformResponse } from '../helpers/data';
import { processHeaders, flattenHeaders } from '../helpers/headers';
import transform from './transform';
import xhr from './xhr';

function dispatchRequest(config: AxiosRequestConfig): AxiosPromise {
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
    const { url, params } = config;
    return builndUrl(url!, params);
}
function transformRequestData(config: AxiosRequestConfig): any {
    return transformRequest(config.data);
}

function transformHeaders(config: AxiosRequestConfig) {
    const { headers = {}, data } = config;
    return processHeaders(headers, data);
}
function transformResponseData(res: AxiosResponse): AxiosResponse {
    // res.data = transformResponse(res.data);
    // return res;
    res.data = transform(res.data, res.headers, res.config.transformResponse);
    return res;
}
export default dispatchRequest;
