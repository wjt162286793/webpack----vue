
const fs = require('fs')
const path = require('path');
const querystring = require('querystring');
const url = require('url');
const util = require('util');
const { v4: uuidv4 } = require('uuid');

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
                        console.log(list.findIndex(item => reqData.name === item.name), '查询匹配')
                        if (list.findIndex(item => reqData.name == item.name) != -1) {
                            //匹配到相同账号名
                            callBack(res, 'Content-Type', 'application/json; charset=utf-8', 201, [], '该资产已被注册')
                            return
                        } else {
                            //未匹配到相同相同账号名
                            reqData.uuid = uuidv4()
                            list.push(reqData)
                        }
                    } else {
                        //数据本身为空
                        reqData.uuid = uuidv4()
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
                    reqData = JSON.parse(postData)
                    console.log(reqData,'请求数据')
                    let list = fileData
                    let {name,user,status} = reqData
                    let trueList = list.filter(item=>item.name === name)
                    console.log(trueList,'符合条件的数据')
                    let resData = {
                        total: trueList.length,
                        list:trueList
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
                    console.log(reqData, '请求数据')
                    let Index = fileData.findIndex(v => v.id == reqData.id)
                    fileData[Index] = reqData
                    console.log(fileData, '虞姬发送数据')
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
        //资产修改
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