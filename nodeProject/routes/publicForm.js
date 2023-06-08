const fs = require('fs')
const path = require('path')
const {callBack} = require('../globalUtils.js')
const publicFormRoutes = [
    {
        path:"/app/publicForm/template",
        done: (req,res)=>{
      let dataList = []
      let postData = ''
      req.on('data',(chunk)=>{
     postData += chunk
      })
      req.on('end',()=>{
        let reqData = JSON.parse(postData)
        fs.readFile(path.join(__dirname,`../file/publicInfo/${reqData.type}.json`),'utf-8',(error,data)=>{
            if(error){
                console.error('读取文件报错')
            }
            else{
             dataList = JSON.parse(data.toString())
             callBack(res,'Content-Type','application/json; charset=utf-8',200,dataList,'success')
            }
        })
      })
    }
}
]

module.exports.publicFormRoutes = publicFormRoutes

