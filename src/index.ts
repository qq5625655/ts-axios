import { AxiosInstance } from './types/index';
import Axios from './core/Axios';
import { extend } from './helpers/util';

function getAxios(): AxiosInstance {
    const context = new Axios();
    const instance = Axios.prototype.request.bind(context);
    // 挂载接口
    extend(instance, context);

    // ...剩下的所有接口
    return instance as AxiosInstance;
}
const axios = getAxios();
export default axios;
