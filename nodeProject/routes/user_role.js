const path = require('path')
const fs = require('fs')

const userRoleList = [
    {
        path:'/app/userRole/userlist',
        done:(req,res)=>{
            let fileData = []
            fs.readFile(path.join(__dirname,'../file/user.json'),'utf8',(err,data)=>{
                if(err){
                  
                }else{
                    fileData = JSON.parse(data.toString())
                    let postData = ''
                    req.on('data',(chunk)=>{
                  postData+=chunk
                    })
                    req.on('end',()=>{
                     let reqData = JSON.parse(postData)
                     let list = []
                     fileData.forEach(item=>{
                        list.push({
                            name:item.name,
                            role:item.role,
                            userName:item.userName
                        })
                     })
                     callBack(res, 'Content-Type', 'application/json; charset=utf-8', 200, list, 'success')
                    })
                }
            })

        }
    },
    {
        path:'/app/userRole/roleList',
        done:(req,res)=>{
            let fileData = []
            fs.readFile(path.join(__dirname,'../file/role.json'),'utf8',(err,data)=>{
                if(err){
                  
                }else{
                    fileData = JSON.parse(data.toString())
                    let postData = ''
                    req.on('data',(chunk)=>{
                  postData+=chunk
                    })
                    req.on('end',()=>{
                        callBack(res, 'Content-Type', 'application/json; charset=utf-8', 200, fileData, 'success')
                     
                    })
                }
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
module.exports.userRoleList = userRoleList