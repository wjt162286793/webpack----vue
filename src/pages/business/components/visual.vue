<template>
 <div class="plumbBox">
  <div id="start"></div>
  <div id="end"></div>
 </div>

</template>
<script setup>
import {jsPlumb} from 'jsplumb'
let globalConfig = {
    anchor:['Left','Right','Bottom','Top'],
        connector:'Straight',
        endpoint: 'Blank',
        paintStyle:{stroke:'blue',strokeWidth:1},
        Overlays:[['Aarrow',{width:5,length:5,location:1}]],
     
}
let info = [
    {
        name:'div1',
        to:['div2','div3',],
        top:100,
        left:500
    },
    {
        name:'div2',
        to:['div4'],
        top:300,
        left:300
    },    {
        name:'div3',
        to:['div5'],
        top:300,
        left:700
    },
    {
        name:'div4',
        to:[],
        top:500,
        left:100
    },
    {
        name:'div5',
        to:[],
        top:500,
        left:900
    }
]
//引入jsPlumb

console.log(jsPlumb,'jsplumb类')
let plumbInit = jsPlumb.getInstance() //初始化jsplumb实例
console.log(plumbInit,'初始化实例')
//图形的数据配置
let plumbConfig = {
    source:'start',  //起始节点
    target:'end', //终止节点
    anchor:['Left','Right'], //连接的锚点
    connector: ['Bezier'], //连接方式
    endpoint: 'Dot', //端点类型
    Overlays:[], //连接线上中间的一些自定义类型,比如label说明或者一个可动的箭头
    paintStyle:{stroke:'yellow',strokeWidth:5}  //连接线的样式
}
onMounted(() => {
    //这里需要等所依赖的DOM节点全部渲染完毕,才能进行图形渲染
    nextTick(()=>{
     //渲染函数
     plumbInit.ready(()=>{
        plumbInit.connect(plumbConfig)
     })
    })
})
</script>
<style lang="less" scoped>
.plumbBox{
    position: relative;
    width: 100%;
    height: 100%;
    #start{
        width: 100px;
        height: 100px;
        position: absolute;
        left:100px;
        top: 100px;
        background: red;
        border-radius:  50%;
    }
    #end{
        width: 100px;
        height: 100px;
        position: absolute;
        left: 300px;
        top: 300px;
        background: green;
        border-radius:  50%;
    }
}
</style>