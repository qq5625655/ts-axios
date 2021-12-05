import axios from '../../src/index';

axios({
    method: 'post',
    url: '/api/handleRequestBody/post',
    data: {
        a: 1,
        b: 2,
    },
});
const arr = new Int32Array([21, 31]);

axios({
    method: 'post',
    url: '/api/handleRequestBody/post',
    data: arr,
});
