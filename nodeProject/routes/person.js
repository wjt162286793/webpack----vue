
const fs = require('fs')
const path = require('path');
const querystring = require('querystring');
const url = require('url');
const util = require('util');

const personRoutes = [{
    path: '/app/person/query',
    done: function (req, res) {
        let postData = ''
        req.on('data', function (chunk) {
            postData += chunk
        })
        req.on('end', function () {
            let list = []
            list.push(JSON.parse(postData))
            list = JSON.stringify(list)
            fs.writeFile(path.join(__dirname, '../file/person.json'), list, function (err) {
                if (err) {
                    return console.error(err)
                }
                res.setHeader('Content-Type', 'application/json; charset=utf-8')
                res.end(JSON.stringify({
                    code: 200,
                    data: [],
                    message: '新增成功'
                }))
            })
        })

    }
},
{
    path: '/app/person/list',
    done: function (req, res) {
        let params = url.parse(req.url, true).query
        fs.readFile(path.join(__dirname, '../file/person.json'), function (err, data) {
            if (err) {
                return console.error(err)
            }
            res.setHeader('Content-Type', 'application/json; charset=utf-8')
            res.end(JSON.stringify({
                code: 200,
                data: JSON.parse(data.toString()),
                message: '获取列表成功'
            }))
        })
    }
}
]
module.exports.personRoutes = personRoutes