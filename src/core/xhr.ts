import { AxiosRequestConfig, AxiosResponse, AxiosPromise } from '../types';
import { parseHeaders } from '../helpers/headers';
import { createError } from '../helpers/error';
function axios(config: AxiosRequestConfig): AxiosPromise {
    return new Promise((resolve, reject) => {
        const {
            data = null,
            url,
            method = 'get',
            headers,
            responseType,
            timeout,
        } = config;

        const request = new XMLHttpRequest();
        if (responseType) {
            request.responseType = responseType;
        }
        if (timeout) {
            request.timeout = timeout;
        }
        request.open(method.toUpperCase(), url!, true);
        request.onreadystatechange = function handleLoad() {
            if (request.status === 0) {
                return;
            }
            if (request.readyState !== 4) {
                return;
            }

            const responseHeaders = parseHeaders(
                request.getAllResponseHeaders(),
            );
            const responseData =
                responseType && responseType !== 'text'
                    ? request.response
                    : request.responseText;
            const response: AxiosResponse = {
                data: responseData,
                status: request.status,
                statusText: request.statusText,
                headers: responseHeaders,
                config,
                request,
            };
            function handleResponse(response: AxiosResponse): void {
                if (response.status >= 200 && response.status < 300) {
                    resolve(response);
                } else {
                    reject(
                        createError(
                            `Request failed with status code ${response.status}`,
                            config,
                            null,
                            request.status,
                            response,
                        ),
                    );
                }
            }
            handleResponse(response);
        };
        request.onerror = function () {
            reject(createError('Net Error', config, null, request));
        };
        request.ontimeout = function (error) {
            reject(
                createError(
                    `Timeout of ${timeout} ms exceeded`,
                    config,
                    'Timeout',
                    request,
                ),
            );
        };
        Object.keys(headers).forEach((name) => {
            if (data === null && name.toLowerCase() === 'content-type') {
                delete headers[name];
            } else {
                request.setRequestHeader(name, headers[name]);
            }
        });
        request.send(data);
    });
}

export default axios;
