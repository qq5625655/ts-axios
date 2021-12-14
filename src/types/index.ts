export type Method =
    | 'get'
    | 'GET'
    | 'delete'
    | 'Delete'
    | 'head'
    | 'HEAD'
    | 'options'
    | 'OPTIONS'
    | 'post'
    | 'POST'
    | 'put'
    | 'PUT'
    | 'patch'
    | 'PATCH';

export interface AxiosRequestConfig {
    url?: string;
    method?: Method;
    data?: any;
    params?: any;
    headers?: any;
    responseType?: XMLHttpRequestResponseType;
    timeout?: number;
    [propName: string]: any;

    transformRequest?: AxiosTransformer | AxiosTransformer[];
    transformResponse?: AxiosTransformer | AxiosTransformer[];
}
export interface AxiosTransformer {
    (data: any, headers?: any): any;
}

export interface AxiosResponse {
    data: any;
    status: number;
    statusText: string;
    headers: any;
    config: AxiosRequestConfig;
    request: any;
}
export type AxiosPromise = Promise<AxiosResponse>;

export interface AxiosError extends Error {
    config: AxiosRequestConfig;
    code?: string | null | number;
    request?: any;
    response?: AxiosResponse;
}

export interface Axios {
    // interceptors: {};
    request(config: AxiosRequestConfig): AxiosPromise;

    get(url: string, config?: AxiosRequestConfig): AxiosPromise;

    delete(url: string, config?: AxiosRequestConfig): AxiosPromise;

    head(url: string, config?: AxiosRequestConfig): AxiosPromise;

    options(url: string, config?: AxiosRequestConfig): AxiosPromise;

    // 以下三个与上面三个多了data参数

    post(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise;

    put(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise;

    patch(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise;
}
export interface AxiosInstance extends Axios {
    (config: AxiosRequestConfig): AxiosPromise;
    (url: string, config?: AxiosRequestConfig): AxiosPromise;
    create(config?: AxiosRequestConfig): AxiosInstance;
    defaults: any;
}

export interface AxiosInterceptorManager<T> {
    use(resolved: ResolvedFn<T>, rejected?: RejectedFn): number;
}
export interface ResolvedFn<T = any> {
    (val: T): T | Promise<T>;
}

export interface RejectedFn {
    (error: any): any;
}
