import axios from '../src/index';
import { AxiosRequestConfig, AxiosResponse } from '../src/types/index';
import { getAjaxRequest } from './helpers';

describe('instance', () => {
    beforeEach(() => {
        jasmine.Ajax.install();
    });

    afterEach(() => {
        jasmine.Ajax.uninstall();
    });

    test('should make a http request without verb helper', () => {
        const instance = axios.create();

        instance('/foo');

        return getAjaxRequest().then((request) => {
            expect(request.url).toBe('/foo');
        });
    });

    test('should make a http request', () => {
        const instance = axios.create();

        instance.get('/foo');

        return getAjaxRequest().then((request) => {
            expect(request.url).toBe('/foo');
            expect(request.method).toBe('GET');
        });
    });

    test('should make a post request', () => {
        const instance = axios.create();

        instance.post('/foo');

        return getAjaxRequest().then((request) => {
            expect(request.method).toBe('POST');
        });
    });

    test('should make a put request', () => {
        const instance = axios.create();

        instance.put('/foo');

        return getAjaxRequest().then((request) => {
            expect(request.method).toBe('PUT');
        });
    });

    test('should make a patch request', () => {
        const instance = axios.create();

        instance.patch('/foo');

        return getAjaxRequest().then((request) => {
            expect(request.method).toBe('PATCH');
        });
    });

    test('should make a options request', () => {
        const instance = axios.create();

        instance.options('/foo');

        return getAjaxRequest().then((request) => {
            expect(request.method).toBe('OPTIONS');
        });
    });

    test('should make a delete request', () => {
        const instance = axios.create();

        instance.delete('/foo');

        return getAjaxRequest().then((request) => {
            expect(request.method).toBe('DELETE');
        });
    });

    test('should make a head request', () => {
        const instance = axios.create();

        instance.head('/foo');

        return getAjaxRequest().then((request) => {
            expect(request.method).toBe('HEAD');
        });
    });

    test('should use instance options', () => {
        const instance = axios.create({ timeout: 1000 });

        instance.get('/foo');

        return getAjaxRequest().then((request) => {
            expect(request.timeout).toBe(1000);
        });
    });

    test('should have defaults.headers', () => {
        const instance = axios.create({ baseURL: 'https://api.example.com' });

        expect(typeof instance.defaults.headers).toBe('object');
        expect(typeof instance.defaults.headers.common).toBe('object');
    });
});
