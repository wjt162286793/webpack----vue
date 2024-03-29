
const fs = require('fs')
const path = require('path');
const querystring = require('querystring');
const url = require('url');
const util = require('util');
const { v4: uuidv4 } = require('uuid');
const moment = require('moment')
const businessRoutes = [
    {
        //新建业务领域
        path: '/app/business/new',
        done: function (req, res) {
            let oldData = []
            //读取文件
            fs.readFile(path.join(__dirname, '../file/business.json'), 'utf8', (err, data) => {
                if (err) {
                    console.log(err, '读取报错')
                } else {
                    console.log(data, '???')
                    oldData = JSON.parse(data.toString())
                    console.log(oldData, '当前文件数据');
                }

                let postData = ''
                //请求流
                req.on('data', function (chunk) {
                    postData += chunk
                })
                //请求结束
                req.on('end', function () {
                    reqData = JSON.parse(postData)
                    let list = oldData
                    // list.push(JSON.parse(postData))
                    if (oldData.length > 0) {
                        if (list.findIndex(item => reqData.name == item.name) != -1) {
                            //匹配到相同账号名
                            callBack(res, 'Content-Type', 'application/json; charset=utf-8', 201, [], '该资产已被注册')
                            return
                        } else {
                            //未匹配到相同相同账号名
                            reqData.uuid = uuidv4()
                            let time = moment().format('YYYY-MM-DD hh:mm:ss')
                            reqData.time = time
                            list.push(reqData)
                        }
                    } else {
                        //数据本身为空
                        reqData.uuid = uuidv4()
                        let time = moment().format('YYYY-MM-DD hh:mm:ss')
                        reqData.time = time
                        list.push(reqData)
                    }
                    list.map((item, index) => { item.id = index + 1 })
                    list = JSON.stringify(list)
                    fs.writeFile(path.join(__dirname, '../file/business.json'), list, function (err) {
                        if (err) {
                            return console.error(err)
                        }
                        callBack(res, 'Content-Type', 'application/json; charset=utf-8', 200, [], 'success')
                    })
                })
            })

        }
    },
    {
        //列表查询
        path: '/app/business/list',
        done: function (req, res) {
            let fileData = []
            //读取文件
            fs.readFile(path.join(__dirname, '../file/business.json'), 'utf8', (err, data) => {
                if (err) {
                    console.log(err, '读取报错')
                    callBack(res, 'Content-Type', 'application/json; charset=utf-8', 201, [], 'error')
                    return
                } else {
                    fileData = JSON.parse(data.toString())
                }

                let postData = ''
                //请求流
                req.on('data', function (chunk) {
                    postData += chunk
                })
                //请求结束
                req.on('end', function () {
                    let reqData = JSON.parse(postData)
                    let queryData = reqData.queryData
                    let { pageSize, currentPage } = reqData
                    // console.log(reqData,'请求数据')
                    // console.log(fileData,'文件数据')
                    let arr = []
                    for (let val in queryData) {
                        console.log(val, '每一项的键')
                        console.log(queryData[val], '每一项的值')
                        if (queryData[val].toString() && queryData[val].toString().length > 0) {
                            arr.push([val, queryData[val]])
                        }
                    }
                    console.log(arr, '符合的数据')
                    let list = []
                    if (arr.length === 0) {
                        list = fileData
                    } else {
                        list = []
                        fileData.forEach(item => {
                            let flag = arr.every(n =>
                                item[n[0]].toString() === n[1].toString()
                            )
                            if (flag) {
                                list.push(item)
                            }
                        })
                    }
                    let filterData = list.slice((currentPage - 1) * pageSize, currentPage * pageSize)
                    console.log((currentPage - 1) + (currentPage - 1) * pageSize, currentPage * pageSize, '截取值')
                    let resData = {
                        total: list.length,
                        list: filterData
                    }
                    callBack(res, 'Content-Type', 'application/json; charset=utf-8', 200, resData, 'success')
                })
            })

        }
    },
    {
        //查询详情
        path: '/app/business/Info',
        done: function (req, res) {
            let fileData = []
            //读取文件
            fs.readFile(path.join(__dirname, '../file/business.json'), 'utf8', (err, data) => {
                if (err) {
                    console.log(err, '读取报错')
                    callBack(res, 'Content-Type', 'application/json; charset=utf-8', 201, [], 'error')
                    return
                } else {
                    fileData = JSON.parse(data.toString())
                }

                let postData = ''
                //请求流
                req.on('data', function (chunk) {
                    postData += chunk
                })
                //请求结束
                req.on('end', function () {
                    console.log(postData.id, fileData, '具体资产数据')
                    reqData = JSON.parse(postData)
                    let Info = fileData.find(v => v.id == reqData.id)
                    callBack(res, 'Content-Type', 'application/json; charset=utf-8', 200, Info, 'success')
                })
            })

        }
    },
    {
        //修改资产
        path: '/app/business/change',
        done: function (req, res) {
            let fileData = []
            //读取文件
            fs.readFile(path.join(__dirname, '../file/business.json'), 'utf8', (err, data) => {
                if (err) {
                    console.log(err, '读取报错')
                    callBack(res, 'Content-Type', 'application/json; charset=utf-8', 201, [], 'error')
                    return
                } else {
                    fileData = JSON.parse(data.toString())
                }

                let postData = ''
                //请求流
                req.on('data', function (chunk) {
                    postData += chunk
                })
                //请求结束
                req.on('end', function () {
                    reqData = JSON.parse(postData)
                    let time = moment().format('YYYY-MM-DD hh:mm:ss')
                    reqData.time = time
                    console.log(reqData, '请求数据')
                    let Index = fileData.findIndex(v => v.id == reqData.id)
                    fileData[Index] = reqData
                    console.log(fileData, '预计发送数据')
                    let list = JSON.stringify(fileData)
                    fs.writeFile(path.join(__dirname, '../file/business.json'), list, (error) => {
                        if (error) {

                        }
                        callBack(res, 'Content-Type', 'application/json; charset=utf-8', 200, {}, 'success')

                    })

                })
            })

        }
    },
    {
        //资产删除
        path: '/app/business/delete',
        done: function (req, res) {
            let fileData = []
            //读取文件
            fs.readFile(path.join(__dirname, '../file/business.json'), 'utf8', (err, data) => {
                if (err) {
                    console.log(err, '读取报错')
                    callBack(res, 'Content-Type', 'application/json; charset=utf-8', 201, [], 'error')
                    return
                } else {
                    fileData = JSON.parse(data.toString())
                }

                let postData = ''
                //请求流
                req.on('data', function (chunk) {
                    postData += chunk
                })
                //请求结束
                req.on('end', function () {
                    reqData = JSON.parse(postData)
                    console.log(reqData, '数据')
                    let Index = fileData.findIndex(v => v.id == reqData.id)
                    console.log(Index, '排名第几')
                    fileData.splice(Index, 1)
                    let list = JSON.stringify(fileData)
                    fs.writeFile(path.join(__dirname, '../file/business.json'), list, (error) => {
                        if (error) {

                        }
                        callBack(res, 'Content-Type', 'application/json; charset=utf-8', 200, {}, 'success')

                    })

                })
            })

        }
    },
    {
        path: '/app/user/createVue',
        done: function (req, res) {
            let str = `
        <template>
  <div>不好意思哦.该页面不存在</div>
</template>

<script>
export default {
  name: "nofound",
};
</script>

<style lang="less" scoped>
</style>

        `
            let params = url.parse(req.url, true).query
            console.log(params, '请求数据')
            fs.writeFile(path.join(__dirname, '../../src/pages/test.vue'), str, function (err) {
                if (err) {
                    return console.error(err)
                }
                callBack(res, 'Content-Type', 'application/json; charset=utf-8', 200, [], '页面创建成功')
            })

        }
    }
]
/** 
 * @function:响应功能函数
 * @param:res为响应函数,type为请求头类型,headers为请求头参数,code为响应code,data为响应数据,message为响应状态
 * @return:无返回值
*/

function callBack(res, type, headers, code, data, message) {
    res.setHeader(type, headers)
    res.end(JSON.stringify({
        code,
        data,
        message
    }))
}
module.exports.businessRoutes = businessRoutes