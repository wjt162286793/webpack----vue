const fs = require('fs')
const path = require('path')
const url = require('url');
const { v4: uuidv4 } = require('uuid');
const moment  = require('moment')
const riskRoutes = [
    {
        //新建风险资产
        path: '/app/risk/new',
        done: function (req, res) {
            let oldData = []
            //读取文件
            fs.readFile(path.join(__dirname, '../file/risk.json'), 'utf8', (err, data) => {
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
                        if (list.findIndex(item => reqData.riskAlias == item.riskAlias) != -1) {
                            //匹配到相同的风险别名
                            callBack(res, 'Content-Type', 'application/json; charset=utf-8', 201, [], '该资产已被注册')
                            return
                        } else {
                            //未匹配到相同相同账号名
                            reqData.uuid = uuidv4()
                            let time  = moment().format('YYYY-MM-DD hh:mm:ss')
                            reqData.time = time
                            list.push(reqData)
                        }
                    } else {
                        //数据本身为空
                        reqData.uuid = uuidv4()
                        let time  = moment().format('YYYY-MM-DD hh:mm:ss')
                        reqData.time = time
                        reqData.recordList.push({
                            time:time,
                            name:'创建',
                            user:reqData.doneUser
                        })
                        list.push(reqData)
                    }
                    list.map((item, index) => { item.id = index + 1 })
                    list = JSON.stringify(list)
                    fs.writeFile(path.join(__dirname, '../file/risk.json'), list, function (err) {
                        if (err) {
                            return console.error(err)
                        }else{
                    /**业务领域 */
                    let withFileData = ''
                  if(reqData.mode === 'business'){
                   fs.readFile(path.join(__dirname,'../file/business.json'), 'utf8', function(err,datas){
                    if(err){
                        console.log(err, '读取报错')
                    }else{
                      withFileData = JSON.parse(datas.toString())
                      let index_ = withFileData.findIndex(item=>item.uuid === reqData.propertyId)
                      withFileData[index_].isRisk = true
                      withFileData = JSON.stringify(withFileData)
                      fs.writeFile(path.join(__dirname,'../file/business.json'),withFileData,function(err){
                        if (err) {
                            return console.error(err)
                        }else{
                            callBack(res, 'Content-Type', 'application/json; charset=utf-8', 200, [], 'success')
                        }
                      })
                    }
                   })
                  }else{
                    /*非业务领域的其余类型资产*/
                    fs.readFile(path.join(__dirname,`../file/publicList/${reqData.mode}.json`), 'utf8', function(err,datas){
                        if(err){
                            console.log(err, '读取报错')
                        }else{
                          withFileData = JSON.parse(datas.toString())
                          let index_ = withFileData.findIndex(item=>item.uuid === reqData.propertyId)
                          withFileData[index_].isRisk = true
                          withFileData = JSON.stringify(withFileData)
                          fs.writeFile(path.join(__dirname,`../file/publicList/${reqData.mode}.json`),withFileData,function(err){
                            if (err) {
                                return console.error(err)
                            }else{
                                callBack(res, 'Content-Type', 'application/json; charset=utf-8', 200, [], 'success')
                            }
                          })
                        }
                       })
                  }
                        }
                    })
                })
            })

        }
    },
    {
        //列表查询
        path: '/app/risk/list',
        done: function (req, res) {
            let fileData = []
            //读取文件
            fs.readFile(path.join(__dirname, '../file/risk.json'), 'utf8', (err, data) => {
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
                    let {pageSize,currentPage} = reqData
                    // console.log(reqData,'请求数据')
                    // console.log(fileData,'文件数据')
                    let arr = []
                    for(let val in queryData){
                        console.log(val,'每一项的键')
                        console.log(queryData[val],'每一项的值')
                        if(queryData[val].toString()&&queryData[val].toString().length>0){
                            arr.push([val,queryData[val]])
                        }
                    }
                    console.log(arr,'符合的数据')
                    let list = []
                    if(arr.length === 0){
                        list = fileData
                    }else{
                        list = []
                        fileData.forEach(item=>{
                           let flag = arr.every(n=>
                            item[n[0]].toString() === n[1].toString()
                           )
                           if(flag){
                            list.push(item)
                           }
                        })
                    }
                    let filterData = list.slice((currentPage-1)*pageSize,currentPage*pageSize)
                    console.log((currentPage-1)+(currentPage-1)*pageSize,currentPage*pageSize,'截取值')
                    let resData = {
                        total: list.length,
                        list:filterData
                    }
                    callBack(res, 'Content-Type', 'application/json; charset=utf-8', 200, resData, 'success')
                })
            })

        }
    },
]
function callBack(res, type, headers, code, data, message) {
    res.setHeader(type, headers)
    res.end(JSON.stringify({
        code,
        data,
        message
    }))
}
module.exports.riskRoutes = riskRoutes