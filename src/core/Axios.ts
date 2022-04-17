import {
    AxiosPromise,
    AxiosRequestConfig,
    AxiosResponse,
    Method,
    ResolvedFn,
    RejectedFn,
} from '../types';
import dispatchRequest from './dispatchRequest';
import InterceptorManager from './interceptorManager';
import mergeConfig from './mergeConfig';

interface Interceptors {
    request: InterceptorManager<AxiosRequestConfig>;
    response: InterceptorManager<AxiosResponse>;
}
interface PromiseChain {
    resolved: ResolvedFn | ((config: AxiosRequestConfig) => AxiosPromise);
    rejected?: RejectedFn;
}

interface Axios {
    interceptors: Interceptors;
    defaults: AxiosRequestConfig;
    // new (): void;
}
const Axios = function (this: Axios, initConfig: AxiosRequestConfig) {
    // do nothing
    this.defaults = initConfig;
    // Interceptors
    this.interceptors = {
        request: new InterceptorManager<AxiosRequestConfig>(),
        response: new InterceptorManager<AxiosResponse>(),
    };
} as any as { new (defaults: AxiosRequestConfig): void };

export default Axios;
Axios.prototype.request = function (url: any, config: AxiosRequestConfig) {
    if (typeof url === 'string') {
        config = config ? config : {};
        config.url = url;
    } else {
        config = url;
    }
    console.log('request---', config);
    config = mergeConfig(this.defaults, config);
    console.log('---request', config);
    const chain: PromiseChain[] = [
        {
            resolved: dispatchRequest,
            rejected: undefined,
        },
    ];

    this.interceptors.request.forEach((interceptor: PromiseChain) => {
        chain.unshift(interceptor);
    });

    this.interceptors.response.forEach((interceptor: PromiseChain) => {
        chain.push(interceptor);
    });

    let promise = Promise.resolve(config);

    while (chain.length) {
        const { resolved, rejected } = chain.shift()!;
        promise = promise.then(resolved, rejected);
    }

    return promise;
    // return dispatchRequest(config);
};
Axios.prototype.get = function (
    url: string,
    config?: AxiosRequestConfig,
): AxiosPromise {
    return this._requestMethodWithoutData('get', url, config);
};
Axios.prototype.delete = function (
    url: string,
    config?: AxiosRequestConfig,
): AxiosPromise {
    return this._requestMethodWithoutData('delete', url, config);
};
Axios.prototype.head = function (
    url: string,
    config?: AxiosRequestConfig,
): AxiosPromise {
    return this._requestMethodWithoutData('head', url, config);
};
Axios.prototype.options = function (
    url: string,
    config?: AxiosRequestConfig,
): AxiosPromise {
    return this._requestMethodWithoutData('options', url, config);
};
Axios.prototype.post = function (
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
): AxiosPromise {
    return this._requestMethodWithData('post', url, data, config);
};
Axios.prototype.put = function (
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
): AxiosPromise {
    return this._requestMethodWithData('put', url, data, config);
};
Axios.prototype.patch = function (
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
): AxiosPromise {
    return this._requestMethodWithData('patch', url, data, config);
};

Axios.prototype._requestMethodWithoutData = function (
    method: Method,
    url: string,
    config?: AxiosRequestConfig,
) {
    return this.request(
        Object.assign(config || {}, {
            method,
            url,
        }),
    );
};
Axios.prototype._requestMethodWithData = function (
    method: Method,
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
) {
    return this.request(
        Object.assign(config || {}, {
            method,
            url,
            data,
        }),
    );
};
// export default class Axios  {
//   [x: string]: any; // 只是对_proto_的解析

//   request(config: AxiosRequestConfig): AxiosPromise {

//     return dispatchRequest(config);
//   }

//   get(url: string, config?: AxiosRequestConfig): AxiosPromise {
//     return this._requestMethodWithoutData("get", url, config);
//   }

//   delete(url: string, config?: AxiosRequestConfig): AxiosPromise {
//     return this._requestMethodWithoutData("delete", url, config);
//   }

//   head(url: string, config?: AxiosRequestConfig): AxiosPromise {
//     return this._requestMethodWithoutData("head", url, config);
//   }

//   options(url: string, config?: AxiosRequestConfig): AxiosPromise {
//     return this._requestMethodWithoutData("options", url, config);
//   }

//   post(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
//     return this._requestMethodWithData("post", url, data, config);
//   }

//   put(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
//     return this._requestMethodWithData("put", url, data, config);
//   }

//   patch(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise {
//     return this._requestMethodWithData("patch", url, data, config);
//   }

//   _requestMethodWithoutData(
//     method: Method,
//     url: string,
//     config?: AxiosRequestConfig
//   ) {
//     return this.request(
//       Object.assign(config || {}, {
//         method,
//         url
//       })
//     );
//   }

//   _requestMethodWithData(
//     method: Method,
//     url: string,
//     data?: any,
//     config?: AxiosRequestConfig
//   ) {
//     return this.request(
//       Object.assign(config || {}, {
//         method,
//         url,
//         data
//       })
//     );
//   }
// }
