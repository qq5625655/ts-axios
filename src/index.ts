import { AxiosInstance, AxiosRequestConfig } from './types/index';
import Axios from './core/Axios';
import { extend } from './helpers/util';
import defaults from './default';
function getAxios(config: AxiosRequestConfig): AxiosInstance {
    const context = new Axios(config);
    const instance = Axios.prototype.request.bind(context);
    // 挂载接口
    extend(instance, context);

    // ...剩下的所有接口
    return instance as AxiosInstance;
}
const axios = getAxios(defaults);
export default axios;
