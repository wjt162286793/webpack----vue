const path = require('path')
const fs = require('fs')

const userRoleList = [
    {
        path: '/app/userRole/userlist',
        done: (req, res) => {
            let fileData = []
            fs.readFile(path.join(__dirname, '../file/user.json'), 'utf8', (err, data) => {
                if (err) {

                } else {
                    fileData = JSON.parse(data.toString())
                    let postData = ''
                    req.on('data', (chunk) => {
                        postData += chunk
                    })
                    req.on('end', () => {
                        let reqData = JSON.parse(postData)
                        let queryList = []
                        let query = reqData.query
                        let pageInfo = reqData.pageInfo
                        for (let obj in query) {
                            if (query[obj].toString() && query[obj].length.toString().length > 0) {
                                queryList.push([obj, query[obj]])
                            }
                        }
                        let list = []
                        if (queryList.length > 0) {
                            fileData.forEach(item => {
                                let flag = queryList.every(v => item[v[0]].toString() === v[1].toString())
                                if (flag) {
                                    list.push(item)
                                }
                            })
                        } else {
                            list = fileData
                        }
                        let List = []
                        list.forEach(item => {
                            List.push({
                                name: item.name,
                                role: item.role,
                                userName: item.userName
                            })
                        })
                        let filterData = List.slice((pageInfo.currentPage - 1) * pageInfo.pageSize, pageInfo.currentPage * pageInfo.pageSize)
                        callBack(res, 'Content-Type', 'application/json; charset=utf-8', 200, { list: filterData, total: List.length }, 'success')
                    })
                }
            })

        }
    },
    {
        path: '/app/userRole/roleList',
        done: (req, res) => {
            let fileData = []
            fs.readFile(path.join(__dirname, '../file/role.json'), 'utf8', (err, data) => {
                if (err) {

                } else {
                    fileData = JSON.parse(data.toString())
                    let postData = ''
                    req.on('data', (chunk) => {
                        postData += chunk
                    })
                    req.on('end', () => {
                        callBack(res, 'Content-Type', 'application/json; charset=utf-8', 200, fileData, 'success')

                    })
                }
            })

        }
    },
    {
        path: '/app/userRole/updateRole',
        done: (req, res) => {
            let postData = ''
            req.on('data', function (chunk) {
                postData += chunk
            })
            req.on('end', function () {
                let reqData = JSON.parse(postData)
                let fileData = JSON.stringify(reqData.data)
                fs.writeFile(path.join(__dirname, '../file/role.json'), fileData, (error) => {
                    callBack(res, 'Content-Type', 'application/json; charset=utf-8', 200, {}, 'success')
                }
                )
            })

        }
    },
    {
        path: '/app/userRole/updateUserRole',
        done: (req, res) => {
            let fileData = []
            fs.readFile(path.join(__dirname, '../file/user.json'), 'utf8', (err, data) => {
                if (err) {

                } else {
                    fileData = JSON.parse(data.toString())
                    let postData = ''
                    req.on('data', function (chunk) {
                        postData += chunk
                    })
                    req.on('end', function () {
                        let reqData = JSON.parse(postData)
                        let index = fileData.findIndex(item => item.name === reqData.data.name)
                        fileData[index] = reqData.data
                        fileData = JSON.stringify(fileData)
                        fs.writeFile(path.join(__dirname, '../file/user.json'), fileData, (error) => {
                            callBack(res, 'Content-Type', 'application/json; charset=utf-8', 200, {}, 'success')
                        }
                        )
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