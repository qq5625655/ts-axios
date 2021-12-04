const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const router = express.Router();

// 使用body-parser中间件
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


router.get('/api/base/get', function (req, res) {
  res.json({
    msg: `hello world`
  })
})

app.use(router)

const port = process.env.PORT || 3000
module.exports = app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}, Ctrl+C to stop`)
});