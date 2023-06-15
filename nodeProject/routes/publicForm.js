const fs = require('fs')
const path = require('path')
const {callBack} = require('../globalUtils.js')
const {v4:uuidv4} = require('uuid')
const moment = require('moment')
const publicFormRoutes = [
    {
        //请求公共模板
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
},
{
  //新建实体
  path: '/app/publicApi/add',
  done: function (req, res) {
    req.on('data', function (chunk) {
        postData += chunk
    })
    //请求结束
    req.on('end', function () {
        let reqData = JSON.parse(postData)
        console.log(reqData,'传递数据??')
        let oldData = []
        //读取文件
        fs.readFile(path.join(__dirname, `../file/publicList/${reqData.mode}.json`), 'utf8', (err, data) => {
            if (err) {
                console.log(err, '读取报错')
            } else {
                oldData = JSON.parse(data.toString())
                console.log(oldData, '当前文件数据');
                
            let postData = ''
            //请求流
  
            }
        })

        let list = oldData
        // list.push(JSON.parse(postData))
        if (oldData.length > 0) {
            if (list.findIndex(item => reqData.entiryName == item.entiryName) != -1) {
                //匹配到相同实体名
                callBack(res, 'Content-Type', 'application/json; charset=utf-8', 201, [], '该实体已被注册')
                return
            } else if(list.findIndex(item => reqData.entiryCnName == item.entiryCnName) != -1){
              //匹配到相同的中文名
              callBack(res, 'Content-Type', 'application/json; charset=utf-8', 201, [], '该实体已被注册')
              return
            }
            else {
                //未匹配到相同相同账号名
                reqData.uuid = uuidv4()
                let updateTime  = moment().format('YYYY-MM-DD hh:mm:ss')
                reqData.updateTime = updateTime
                list.push(reqData)
            }
        } else {
            //数据本身为空
            console.log(reqData,'这里的数据???')
            reqData.uuid = uuidv4()
            let updateTime  = moment().format('YYYY-MM-DD hh:mm:ss')
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
    })


  }
},
{
    //修改
    path: '/app/entiryEdit',
    done: function (req, res) {
        let oldData = []
        //读取文件
        fs.readFile(path.join(__dirname, '../file/publicList/entiry.json'), 'utf8', (err, data) => {
            if (err) {
                console.log(err, '读取报错')
            } else {
                oldData = JSON.parse(data.toString())
                console.log(oldData, '当前文件数据');
                
            let postData = ''
            //请求流
            req.on('data', function (chunk) {
                postData += chunk
            })
            //请求结束
            req.on('end', function () {
                reqData = JSON.parse(postData)
                console.log(reqData,'传递数据??')
                let index = oldData.findIndex(item=>item.uuid === reqData.uuid)
                oldData[index] = reqData
                oldData.map((item, index) => { item.id = index + 1 })
                oldData = JSON.stringify(oldData)
                fs.writeFile(path.join(__dirname, '../file/publicList/entiry.json'), oldData, function (err) {
                    if (err) {
                        return console.error(err)
                    }
                    callBack(res, 'Content-Type', 'application/json; charset=utf-8', 200, [], 'success')
                })
            })
            }
        })
  
    }
  },
]

module.exports.publicFormRoutes = publicFormRoutes

