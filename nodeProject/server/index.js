
const http = require('http')
const routes = require('../routes/index')
const url = require("url")
const port = 8082

const server = function () {
    const serve = http.createServer((req, res) => {
        res.header('Access-Control-Allow-Origin', '*');
        let reqUrl = url.parse(req.url).pathname;
        let routeFilter = routes.find(item => item.path === reqUrl)
        if (routeFilter) {

            routeFilter.done(req, res)
            // res.end(result)
        }
    }).listen(port)
}

module.exports = server