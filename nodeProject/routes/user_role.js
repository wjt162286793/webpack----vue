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