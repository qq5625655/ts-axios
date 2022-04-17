import axios from '../../src/index';

// {
//     validateStatus: function(status){
//         return status >= 200 && status < 500;
//     }
// }

const instance = axios.create();

// console.log('instance', instance);

instance.interceptors.request.use((config) => {
    return config;
});

instance.interceptors.response.use(
    (res) => {
        console.log('res.data222', res);
        return res.data;
    },
    (err) => {
        // console.log('err', err.message);
        return Promise.reject(new Error(err.message));
    },
);

export default {
    get(obj) {
        const { url, data = {}, ...config } = obj;
        return instance.get(url, { params: data, ...config });
    },

    post(obj) {
        const { url, data = {}, ...config } = obj;
        console.log('post', config);
        return instance.post(url, data, config);
    },
};
