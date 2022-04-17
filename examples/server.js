const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const router = express.Router();

// 使用body-parser中间件
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

router.get('/api/base/get', function (req, res) {
    res.json({
        msg: `hello world`,
    });
});
router.get('/api/handleRequestURL/get', function (req, res) {
    res.json(req.query);
});

router.post('/api/handleRequestBody/post', function (req, res) {
    res.json(req.body);
});
router.post('/api/handleRequestHeader/post', function (req, res) {
    res.json(req.body);
});
router.post('/api/getResponse', function (req, res) {
    res.json(req.body);
});

router.post('/api/getResponse2', function (req, res) {
    console.log('res', res.body);
    res.json(req.body);
});

// 6handleError
// 响应正常情况，有50%几率响应成功，有50%几率响应失败，返回状态码500
router.get('/api/handleError', function (req, res) {
    if (Math.random() > 0.5) {
        res.json({
            msg: `hello world`,
        });
    } else {
        res.status(500);
        res.end();
    }
});
// 响应请求超时情况，这里我们设置3秒后响应，而发请求那里设置了超时时间为3秒，所以会发生请求超时异常
router.get('/api/handleError/timeout', function (req, res) {
    setTimeout(() => {
        res.json({
            msg: `hello world`,
        });
    }, 3000);
});

// 7拦截器实例
router.get('/api/expandInterface/get', function (req, res) {
    res.json({
        msg: 'hello world',
    });
});

router.options('/api/expandInterface/options', function (req, res) {
    res.end();
});

router.delete('/api/expandInterface/delete', function (req, res) {
    res.end();
});

router.head('/api/expandInterface/head', function (req, res) {
    res.end();
});

router.post('/api/expandInterface/post', function (req, res) {
    res.json(req.body);
});

router.put('/api/expandInterface/put', function (req, res) {
    res.json(req.body);
});

router.patch('/api/expandInterface/patch', function (req, res) {
    res.json(req.body);
});
// 10章
router.post('/api/transformData', function (req, res) {
    res.json(req.body);
});
app.use(router);

const port = process.env.PORT || 3000;
module.exports = app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}, Ctrl+C to stop`);
});
