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
module.exports.callBack = callBack