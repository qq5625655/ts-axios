import axios from './http';

// 不用担心多余的key，axios会进行一次深拷贝，以defalut为基准，并对config进行解构赋值

// 1.流程proxy->req->res->proxy.then

// - 以url为key

// Content-Type的值，Form与非Form时，payload的区别。
// 1.都只支持字符串类型(以上探究的几种情况)
// 2.Form需要传递的格式为key1=value1&key2=value2,类似GET请求的QueryString格式
// 3.非Form一般为JSON.stringify(formDataObject)形式
// string, plain object, ArrayBuffer, ArrayBufferView, URLSearchParams
// 浏览器专属：FormData, File, Blob, 这种无法识别

// let test = {
//     a: 1,
//     a1: false,
//     b:'1',
//     c: null,
//     d: undefined,
//     e: [1,2,3],
//     f: [{f1:1,f2:2}],
//     g: Symbol(1)
// }
// function deepStringify(value){
//     // if(){}
//     function deep(){

//     }
// }

const proxy = new Proxy(axios, {
    get: function (target, fnName, receiver) {
        return (...args) =>
            new Promise((resolve, reject) => {
                console.log('args', JSON.stringify(args));

                const fn = Reflect.get(target, fnName, receiver);
                fn(...args).then(
                    (res) => {
                        console.log(res, 'proxy.then');
                        resolve(res);
                    },
                    (err) => {
                        console.log(err);
                        reject(err);
                    },
                );
            });
    },
});

export default proxy;
