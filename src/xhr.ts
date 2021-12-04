import { AxiosRequestConfig } from './types';

function axios(config: AxiosRequestConfig) {
    const { data = null, url, method = 'get' } = config;

    const request = new XMLHttpRequest();

    request.open(method.toUpperCase(), url, true);

    request.send(data);
}

export default axios;
