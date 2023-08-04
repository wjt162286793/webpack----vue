/**
 * 
 * @param {*} plumbInstance plumb实例
 * @param {*} infoList 全量数据
 * @param {*} activeNodeInfo 当前选中的节点信息
 * @param {*} activeLineInfo 当前选中的连线信息
 */
//启动
const run = (plumbInstance,infoList,activeNodeInfo,activeLineInfo)=>{
   activeNodeInfo.status = 'success'
   return 'run'
}
//中断
const breakOff = (plumbInstance,infoList,activeNodeInfo,activeLineInfo)=>{
    activeNodeInfo.status = 'error'
    return 'breakOff'
 }
 //暂停
const loading = (plumbInstance,infoList,activeNodeInfo,activeLineInfo)=>{
    activeNodeInfo.status = 'loading'
    return 'loading'
 }
 //重命名
const rename = (plumbInstance,infoList,activeNodeInfo,activeLineInfo)=>{
    console.log(infoList,'列表数据')
    return 'rename'
 }
 //删除节点
const deleteNode = (plumbInstance,infoList,activeNodeInfo,activeLineInfo)=>{
    console.log(infoList,activeNodeInfo,'删除节点')
    infoList.value.forEach(v=>{
        if(v.to && v.to.length>0){
            let i = v.to.findIndex(z=>z === activeNodeInfo.id)
            if(i !== -1){
             v.to.splice(i,1)
            }
        }

    })
    let index = infoList.value.findIndex(v=>activeNodeInfo.id === v.id)
    infoList.value.splice(index,1)

    return 'deleteNode'
 }
 //清除画布
const reset = (plumbInstance,infoList,activeNodeInfo,activeLineInfo)=>{
    console.log(infoList,'列表数据')
    infoList.value = []
    return 'reset'
 }
 //下载图形
const downLoad = (plumbInstance,infoList,activeNodeInfo,activeLineInfo)=>{
    console.log(infoList,'列表数据')
    return 'downLoad'
 }
  //删除连线
const deleteLine = (plumbInstance,infoList,activeNodeInfo,activeLineInfo)=>{
    console.log(infoList,'列表数据')
    infoList.value.forEach(item=>{
         if(item.id === activeLineInfo.sourceId){
             let index = item.to.findIndex(v=>v === activeLineInfo.targetId)
             item.to.splice(index,1)
         }
    })
    return 'deleteLine'
 }
 //修改文字
// const changeText = (plumbInstance,infoList,activeNodeInfo,activeLineInfo)=>{
//     console.log(infoList,'列表数据')
//  }
export default{
    run,
    breakOff,
    rename,
    deleteNode,
    reset,
    downLoad,
    deleteLine,
    loading
    // changeText
}