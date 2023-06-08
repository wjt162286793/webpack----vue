const fs = require('fs')
const path = require('path')
const querystring = require('querystring')
const url = require('url')
const util = require('util')
const publicListRoutes = [
    {
        path:'/app/publicList/template',
        done: (req,res)=>{
            let dataList = []
          fs.readFile(path.join(__dirname,'../file/publicList/template.json'),'utf-8',(err,data)=>{
            if(err){
                console.error(err,'读取文件报错')
            }else{
                dataList = JSON.parse(data.toString())
                console.log(dataList,'文件数据')
            }
            let postData = ''
            req.on('data',(chunk)=>{
                postData += chunk
            })
            req.on('end',()=>{
                reqData = JSON.parse(postData)
                console.log(postData,'请求类型')
                console.log(dataList,'文件')
                let resData = dataList[reqData.name]
                console.log(resData,'结果?')
                callBack(res,'Content-Type','application/json; charset=utf-8',200,resData,'success')
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