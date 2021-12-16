export function getAjaxRequest(): Promise<JasmineAjaxRequest> {
    return new Promise((resolve) => {
        setTimeout(() => {
            // jasmine.Ajax.requests.mostRecent() 模拟ajax请求,模拟返回值
            return resolve(jasmine.Ajax.requests.mostRecent());
        }, 0);
    });
}
