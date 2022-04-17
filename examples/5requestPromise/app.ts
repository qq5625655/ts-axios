// import axios from '../../src/index';
// import axios from './http';
import axios from './proxy';

axios.get({
    url: '/api/handleRequestURL/get',
    params: {
        a: 1,
        b: 2,
    },
    rewardThrottle: {
        wait: 1,
    },
});

// axios.get({
//     method: 'get',
//     url: '/api/handleError1',
// })
//     .then((res) => {
//         console.log(res);
//     })
//     .catch((e) => {
//         console.log('catch', e);
//     });

axios
    .post({
        url: '/api/getResponse',
        data: {
            a: 1,
            b: 2,
            c: null,
        },
    })
    .then((res) => {
        console.log(res);
    });

axios
    .post({
        // method: 'post',
        url: '/api/getResponse',
        responseType: 'json',
        data: {
            a: 3,
            b: 4,
        },
    })
    .then((res) => {
        console.log(res);
    });

const input = document.createElement('input');
input.type = 'file';
input.setAttribute('id', 'test');
console.log(document.body);
document.body.appendChild(input);
document.getElementById('test').addEventListener('input', (e) => {
    const form = new FormData();
    form.append('file', input.files[0]);
    axios
        .post({
            url: '/api/getResponse2',

            data: form,
            headers: {
                'content-type': 'multipart/form-data',
            },
        })
        .then((res) => {
            console.log(res);
        });
});
