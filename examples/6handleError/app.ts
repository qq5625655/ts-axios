import axios from '../../src/core/dispatchRequest';

// 1.正常情况
axios({
    method: 'get',
    url: '/api/handleError',
})
    .then((res) => {
        console.log(res);
    })
    .catch((e) => {
        console.log(e);
    });

// 2.url故意写错
axios({
    method: 'get',
    url: '/api/handleError1',
})
    .then((res) => {
        console.log(res);
    })
    .catch((e) => {
        console.log('catch', e);
    });

// 3. 模拟网络错误
setTimeout(() => {
    axios({
        method: 'get',
        url: '/api/handleError',
    })
        .then((res) => {
            console.log(res);
        })
        .catch((e) => {
            console.log(e);
        });
}, 5000);

// // 4.配置请求超时时间为2秒，模拟请求超时
axios({
    method: 'get',
    url: '/api/handleError/timeout',
    timeout: 2000,
})
    .then((res) => {
        console.log(res);
    })
    .catch((e) => {
        console.log(e.message);
    });
