const { data } = require('autoprefixer')
const fs = require('fs')
const path = require('path')
const querystring = require('querystring')
const url = require('url')
const util = require('util')
const publicListRoutes = [
    {
        path:'/app/publicApi/template',
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
    },
    {
                //列表查询
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
                        console.log(reqData,'请求参数')
                        let {searchData,currentPage,pageSize,modeType} = reqData
                        //读取文件
                        fs.readFile(path.join(__dirname, `../file/publicList/${modeType}.json`), 'utf8', (err, data) => {
                            if (err) {
                                console.log(err, '读取报错')
                                callBack(res, 'Content-Type', 'application/json; charset=utf-8', 201, [], 'error')
                                return
                            } else {
                                fileData = JSON.parse(data.toString())
                                let arr = []
                                for(let val in searchData){
                                    console.log(val,'每一项的键')
                                    console.log(searchData[val],'每一项的值')
                                    if(searchData[val].toString()&&searchData[val].toString().length>0){
                                        arr.push([val,searchData[val]])
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
                                console.log(list,'列表???')
                                let filterData = list.slice((currentPage-1)*pageSize,currentPage*pageSize)
                                console.log((currentPage-1)+(currentPage-1)*pageSize,currentPage*pageSize,'截取值')
                                let resData = {
                                    total: list.length,
                                    list:filterData
                                }
                                callBack(res, 'Content-Type', 'application/json; charset=utf-8', 200, resData, 'success')
                            }
            
                        })

                    })        
                }
    },
    {
        //具体信息
        path: '/app/detailInfo',
        done: function (req, res) {
            let postData = ''
            req.on('data',function(chunk){
                postData+=chunk
            })
            req.on('end',function(){
                let reqData = JSON.parse(postData)
                let fileData = []
                console.log(reqData,'请求参数???')
                fs.readFile(path.join(__dirname,`../file/publicList/${reqData.mode}.json`),'utf8',(err,data)=>{
                    if(err){
                        console.log(err)
                    }else{
                        fileData = JSON.parse(data.toString())
                        let row = fileData.find(item=>item.uuid === reqData.uuid)
                        if(row){
                            callBack(res, 'Content-Type', 'application/json; charset=utf-8', 200, row, 'success')
                        }else{
                            callBack(res, 'Content-Type', 'application/json; charset=utf-8', 201, {}, '未找到对应资源')
                        }
                        
                    }
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
module.exports.publicListRoutes = publicListRoutes