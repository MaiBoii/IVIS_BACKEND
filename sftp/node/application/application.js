const http = require('http');
const cookie = require('cookie');

http.createServer(function (req, res) {
    const cookies = cookie.parse(req.headers.cookie);
    sid = cookies.id;
    res.writeHead(200, {
        'Set-Cookie': ['id=box']
    });
    res.end('cookie!!');
}).listen(3000);