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
    cancelToken?: CancelToken;

    withCredentials?: boolean;
    xsrfCookieName?: string;
    xsrfHeaderName?: string;
    auth?: AxiosBasicCredentials;

    validateStatus?: (status: number) => boolean;

    onDownloadProgress?: (e: ProgressEvent) => void;
    onUploadProgress?: (e: ProgressEvent) => void;
    paramsSerializer?: (params: any) => string;

    baseURL?: string;
}
export interface AxiosTransformer {
    (data: any, headers?: any): any;
}

export interface CancelToken {
    promise: Promise<Cancel>;
    reason?: Cancel;
    throwIfRequested(): void;
}
export interface Canceler {
    (message?: string): void;
}

export interface CancelExecutor {
    (cancel: Canceler): void;
}
export interface CancelTokenSource {
    token: CancelToken;
    cancel: Canceler;
}

export interface CancelTokenStatic {
    new (executor: CancelExecutor): CancelToken;

    source(): CancelTokenSource;
}
export interface Cancel {
    message?: string;
}

export interface CancelStatic {
    new (message?: string): Cancel;
}

export interface AxiosBasicCredentials {
    username: string;
    password: string;
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

    // ?????????????????????????????????data??????

    post(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise;

    put(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise;

    patch(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise;
}
export interface AxiosInstance extends Axios {
    (config: AxiosRequestConfig): AxiosPromise;
    (url: string, config?: AxiosRequestConfig): AxiosPromise;
    create(config?: AxiosRequestConfig): AxiosInstance;
    defaults: any;

    CancelToken: CancelTokenStatic;
    Cancel: CancelStatic;
    isCancel: (value: any) => boolean;
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
