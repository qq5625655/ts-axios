import {
    AxiosPromise,
    AxiosRequestConfig,
    AxiosResponse,
    Method,
} from '../types';
import dispatchRequest from './dispatchRequest';
import InterceptorManager from './interceptorManager';
interface Interceptors {
    request: InterceptorManager<AxiosRequestConfig>;
    response: InterceptorManager<AxiosResponse>;
}
interface Axios {
    interceptors: Interceptors;
    new (): void;
}
const Axios = function (this: Axios) {
    // do nothing  AxiosRequestConfig  <AxiosResponse<any>>
    // interface Interceptors {
    //     request: InterceptorManager<AxiosRequestConfig>,
    //     response: InterceptorManager<AxiosResponse>,
    // }
    // Interceptors
    this.interceptors = {
        request: new InterceptorManager<AxiosRequestConfig>(),
        response: new InterceptorManager<AxiosResponse>(),
    };
} as any as { new (): void };

export default Axios;
Axios.prototype.request = function (
    url: any,
    config: AxiosRequestConfig,
): AxiosPromise {
    if (typeof url === 'string') {
        config = config ? config : {};
        config.url = url;
    } else {
        config = url;
    }
    return dispatchRequest(config);
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
