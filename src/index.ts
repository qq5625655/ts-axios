import { AxiosInstance, AxiosRequestConfig } from './types/index';
import Axios from './core/Axios';
import { extend } from './helpers/util';
import defaults from './default';
import mergeConfig from './core/mergeConfig';
import CancelToken from './cancel/CancelToken';
import Cancel, { isCancel } from './cancel/cancel';

function getAxios(config: AxiosRequestConfig): AxiosInstance {
    const context = new Axios(config);
    const instance = Axios.prototype.request.bind(context);
    // 挂载接口
    extend(instance, context);

    // ...剩下的所有接口
    return instance as AxiosInstance;
}
const axios = getAxios(defaults);
axios.create = function (config: AxiosRequestConfig) {
    return getAxios(mergeConfig(defaults, config));
};
axios.CancelToken = CancelToken;
axios.Cancel = Cancel;
axios.isCancel = isCancel;
export default axios;
