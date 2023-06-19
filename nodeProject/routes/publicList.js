
const fs = require('fs')
const path = require('path')
const querystring = require('querystring')
const url = require('url')
const util = require('util')
const { v4: uuidv4 } = require('uuid')
const moment = require('moment')
const { ElSelect } = require('element-plus')
const publicListRoutes = [
    {
        //请求列表模板
        path: '/app/publicApi/template',
        done: (req, res) => {
            let dataList = []
            fs.readFile(path.join(__dirname, '../file/publicList/template.json'), 'utf-8', (err, data) => {
                if (err) {
                    console.error(err, '读取文件报错')
                } else {
                    dataList = JSON.parse(data.toString())
                    console.log(dataList, '文件数据')
                }
                let postData = ''
                req.on('data', (chunk) => {
                    postData += chunk
                })
                req.on('end', () => {
                    reqData = JSON.parse(postData)
                    console.log(postData, '请求类型')
                    console.log(dataList, '文件')
                    let resData = dataList[reqData.name]
                    console.log(resData, '结果?')
                    callBack(res, 'Content-Type', 'application/json; charset=utf-8', 200, resData, 'success')
                })
            })
        }
    },
    {
        //资产列表查询
        path: '/app/publicApi/list',
        done: function (req, res) {
            let postData = ''
            //请求流
            req.on('data', function (chunk) {
                postData += chunk
            })
            //请求结束
            req.on('end', function () {
                //解析参数
                let fileData = []
                let reqData = JSON.parse(postData)
                console.log(reqData, '查询列表请求参数')
                let { searchData, currentPage, pageSize, modeType } = reqData
                //读取文件
                fs.readFile(path.join(__dirname, `../file/publicList/${modeType}.json`), 'utf8', (err, data) => {
                    console.log('进入')
                    if (err) {
                        console.log(err, '读取报错')
                        callBack(res, 'Content-Type', 'application/json; charset=utf-8', 201, [], 'error')
                        return
                    } else {
                        console.log('...')
                        fileData = JSON.parse(data.toString())
                        console.log(fileData, '???')
                        let arr = []
                        for (let val in searchData) {
                            if (searchData[val].toString() && searchData[val].toString().length > 0) {
                                arr.push([val, searchData[val]])
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
                        console.log(list, '列表???')
                        let filterData = list.slice((currentPage - 1) * pageSize, currentPage * pageSize)
                        console.log((currentPage - 1) + (currentPage - 1) * pageSize, currentPage * pageSize, '截取值')
                        let resData = {
                            total: list.length,
                            list: filterData
                        }
                        callBack(res, 'Content-Type', 'application/json; charset=utf-8', 200, resData, 'success')
                    }

                })

            })
        }
    },
    {
        //查找资产具体信息
        path: '/app/publicApi/detail',
        done: function (req, res) {
            let postData = ''
            req.on('data', function (chunk) {
                postData += chunk
            })
            req.on('end', function () {
                let reqData = JSON.parse(postData)
                let fileData = []
                console.log(reqData, '请求参数???')
                fs.readFile(path.join(__dirname, `../file/publicList/${reqData.mode}.json`), 'utf8', (err, data) => {
                    if (err) {
                        console.log(err)
                    } else {
                        fileData = JSON.parse(data.toString())
                        let row = fileData.find(item => item.uuid === reqData.uuid)
                        if (row) {
                            callBack(res, 'Content-Type', 'application/json; charset=utf-8', 200, row, 'success')
                        } else {
                            callBack(res, 'Content-Type', 'application/json; charset=utf-8', 201, {}, '未找到对应资源')
                        }

                    }
                })
            })
        }
    },
    {
        //新建实体
        path: '/app/publicApi/add',
        done: function (req, res) {
            let postData = ''
            req.on('data', function (chunk) {
                postData += chunk
            })
            //请求结束
            req.on('end', function () {
                let reqData = JSON.parse(postData)
                console.log(reqData, '传递数据??')
                let oldData = []
                //读取文件
                fs.readFile(path.join(__dirname, `../file/publicList/${reqData.mode}.json`), 'utf8', (err, data) => {
                    if (err) {
                        console.log(err, '读取报错')
                    } else {
                        oldData = JSON.parse(data.toString())
                        console.log(oldData, '当前文件数据');

                        let list = oldData
                        // list.push(JSON.parse(postData))
                        if (oldData.length > 0) {
                            if (list.findIndex(item => reqData[`${reqData.mode}Name`] == item[`${reqData.mode}Name`]) != -1) {
                                //匹配到相同实体名
                                callBack(res, 'Content-Type', 'application/json; charset=utf-8', 201, [], '该实体已被注册')
                                return
                            } else if (list.findIndex(item => reqData[`${reqData.mode}Name`] == item[`${reqData.mode}Name`]) != -1) {
                                //匹配到相同的中文名
                                callBack(res, 'Content-Type', 'application/json; charset=utf-8', 201, [], '该实体已被注册')
                                return
                            }
                            else {
                                //未匹配到相同相同账号名
                                reqData.uuid = uuidv4()
                                let updateTime = moment().format('YYYY-MM-DD hh:mm:ss')
                                reqData.updateTime = updateTime
                                list.push(reqData)
                            }
                        } else {
                            //数据本身为空
                            console.log(reqData, '这里的数据???')
                            reqData.uuid = uuidv4()
                            let updateTime = moment().format('YYYY-MM-DD hh:mm:ss')
                            reqData.updateTime = updateTime
                            list.push(reqData)
                        }
                        list.map((item, index) => { item.id = index + 1 })
                        list = JSON.stringify(list)
                        fs.writeFile(path.join(__dirname, `../file/publicList/${reqData.mode}.json`), list, function (err) {
                            if (err) {
                                return console.error(err)
                            }
                            callBack(res, 'Content-Type', 'application/json; charset=utf-8', 200, [], 'success')
                        })

                    }
                })
            })


        }
    },
    {
        //修改
        path: '/app/publicApi/edit',
        done: function (req, res) {
            let postData = ''
            let reqData = ''
            //请求流
            req.on('data', function (chunk) {
                postData += chunk
            })
            //请求结束
            req.on('end', function () {

                reqData = JSON.parse(postData)
                console.log(reqData, '传递数据??')
                //读取文件
                fs.readFile(path.join(__dirname, `../file/publicList/${reqData.mode}.json`), 'utf8', (err, data) => {
                    if (err) {
                        console.log(err, '读取报错')
                    } else {
                        let oldData = ''
                        oldData = JSON.parse(data.toString())
                        console.log(oldData, '当前文件数据');
                        let index = oldData.findIndex(item => item.uuid === reqData.uuid)
                        oldData[index] = reqData
                        oldData.map((item, index) => { item.id = index + 1 })
                        oldData = JSON.stringify(oldData)
                        fs.writeFile(path.join(__dirname, `../file/publicList/${reqData.mode}.json`), oldData, function (err) {
                            if (err) {
                                return console.error(err)
                            }
                            callBack(res, 'Content-Type', 'application/json; charset=utf-8', 200, [], 'success')
                        })
                    }
                })
            })


        }
    },
    {
        path:'/app/publicApi/delete',
        done:(req,res)=>{
            let postData = ''
            let reqData = ''
            req.on('data',function(chunk){
                postData += chunk
            })
            req.on('end',function(){
            reqData = JSON.parse(postData)
            fs.readFile(path.join(__dirname,`../file/publicList/${reqData.mode}.json`),'utf8',(err,data)=>{
                if(err){
                    console.log(err,'错误')
                }else{
                     let fileData = JSON.parse(data.toString())
                    let index = fileData.findIndex(item => item.uuid === reqData.uuid)
                    fileData.splice(index,1)
                    let list = JSON.stringify(fileData)
                    fs.writeFile(path.join(__dirname,`../file/publicList/${reqData.mode}.json`),list,(ERR)=>{
                        if(ERR){

                        }
                        else{
                        callBack(res,'Content-Type', 'application/json; charset=utf-8', 200, {}, 'success')
                        }
                    })
                }
            })

            })
        }
    },
    {
        path:'/app/publicApi/all',
        done:(req,res)=>{
            let postData = ''
            let reqData = ''
            req.on('data',(chunk)=>{
               postData+=chunk
            })
            req.on('end',()=>{
                reqData = JSON.parse(postData)
                console.log(reqData,'模板的数据')
                fs.readFile(path.join(__dirname,`../file/publicList/${reqData.mode}.json`),'utf8',(err,data)=>{
                    if(err){
                      console.log(err,'报错')
                    }else{
                        let fileData = JSON.parse(data.toString())
                        callBack(res,'Content-Type', 'application/json; charset=utf-8', 200, fileData, 'success')
                    }
                })
            })
        }
    }
]
function callBack(res, type, headers, code, data, message) {
    res.setHeader(type, headers)
    res.end(JSON.stringify({
        code,
        data,
        message
    }))
}
module.exports.publicListRoutes = publicListRoutes