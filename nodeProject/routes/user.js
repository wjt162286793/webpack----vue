
const fs = require('fs')
const path = require('path');
const querystring = require('querystring');
const url = require('url');
const util = require('util');
const { v4: uuidv4 } = require('uuid');
const userRoutes = [
    {
        //用户注册
        path: '/app/register/query',
        done: function (req, res) {
            let oldData = []
            //读取文件
            fs.readFile(path.join(__dirname, '../file/user.json'), 'utf8', (err, data) => {
                if (err) {
                    console.log(err, '读取报错')
                } else {
                    console.log(data.toString, '嗯嗯')
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
                            callBack(res, 'Content-Type', 'application/json; charset=utf-8', 201, [], '该账号已被注册')
                            return
                        } else if (list.findIndex(item => reqData.userName == item.userName) != -1) {
                            callBack(res, 'Content-Type', 'application/json; charset=utf-8', 201, [], '该用户名已被使用')
                            return
                        }
                        else {
                            reqData.token = uuidv4()
                            //未匹配到相同相同账号名
                            list.push(reqData)
                        }
                    } else {
                        //数据本身为空
                        reqData.token = uuidv4()
                        list.push(reqData)
                    }
                    list = JSON.stringify(list)
                    fs.writeFile(path.join(__dirname, '../file/user.json'), list, function (err) {
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
        //用户登录
        path: '/app/user/login',
        done: function (req, res) {
            let fileData = []
            //读取文件
            fs.readFile(path.join(__dirname, '../file/user.json'), 'utf8', (err, data) => {
                if (err) {
                    console.log(err, '读取报错')
                    callBack(res, 'Content-Type', 'application/json; charset=utf-8', 201, [], '该账号未注册')
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
                    let list = fileData
                    // list.push(JSON.parse(postData))
                    if (list.length > 0) {
                        let flag = list.find(item => reqData.name === item.name)
                        if (flag) {
                            if (reqData.password === flag.password) {
                                callBack(res, 'Content-Type', 'application/json; charset=utf-8', 200, flag, 'success')
                            } else {
                                callBack(res, 'Content-Type', 'application/json; charset=utf-8', 201, [], '密码输入错误')
                            }

                        } else {
                            callBack(res, 'Content-Type', 'application/json; charset=utf-8', 201, [], '该账号未注册')
                        }

                    } else {
                        //空数据
                        callBack(res, 'Content-Type', 'application/json; charset=utf-8', 201, [], '该账号未注册')
                    }
                })
            })

        }
    },
    {
        path: '/app/user/updatePassword',
        //修改密码
        done: function (req, res) {
            let oldData = []
            //读取文件
            fs.readFile(path.join(__dirname, '../file/user.json'), 'utf8', (err, data) => {
                if (err) {
                    console.log(err, '读取报错')
                    callBack(res, 'Content-Type', 'application/json; charset=utf-8', 201, [], '该账号未注册')
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
                        let Index = list.findIndex(item => reqData.name == item.name)
                        if (Index != -1) {
                            //匹配到相同账号名
                            console.log(list[Index], '修改对象')
                            list[1] = reqData
                            list = JSON.stringify(list)
                            fs.writeFile(path.join(__dirname, '../file/user.json'), list, function (err) {
                                if (err) {
                                    return console.error(err)
                                }
                                callBack(res, 'Content-Type', 'application/json; charset=utf-8', 200, [], '密码修改成功')
                            })
                            return
                        } else {
                            //未匹配到相同相同账号名
                            callBack(res, 'Content-Type', 'application/json; charset=utf-8', 201, [], '该账号未注册')
                        }
                    } else {
                        //数据本身为空
                        callBack(res, 'Content-Type', 'application/json; charset=utf-8', 201, [], '该账号未注册')
                    }
                })
            })

        }
    },
    {
        //全部用户列表
        path: '/app/user/userAllList',
        done: (req, res) => {
            let fileData = []
            fs.readFile(path.join(__dirname, '../file/user.json'), 'utf8', (err, data) => {
                if (err) {
                    console.log(err, '读取错误')
                    callBack(res, 'CONtent-Type', 'application/json; charset=utf-8', 201, [], '未找到任何用户信息')
                } else {
                    fileData = JSON.parse(data.toString())
                    if (fileData.length > 0) {
                        let list = []
                        fileData.forEach(item => {
                            list.push({
                                value: item.name,
                                label: item.userName,
                                role: item.role
                            })
                        })
                        callBack(res, 'Content-Type', 'application/json; charset=utf-8', 200, list, 'success')
                    } else {
                        callBack(res, 'Content-Type', 'application/json; charset=utf-8', 200, [], 'success')
                    }
                }


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
module.exports.userRoutes = userRoutes