<template>
    <div class="contentBox">
        <div class="leftMenu">
            <h3>流程节点</h3>
            <draggable @start="nodeMoveStart" @end="nodeMoveEnd" v-model="props.leftNodeList">
                <div v-for="(nodeItem, nodeIndex) in leftNodeList" :key="nodeItem.nodeId" class="nodeItem">{{ nodeItem.label
                }}</div>
            </draggable>
        </div>
        <div class="canvasBox" id="canvasBox">
            <div v-for="(canvasNodeItem, canvasNodeIndex) in infoList" :key="canvasNodeIndex" :id="canvasNodeItem.id"
                :style="canvasNodeStyle(canvasNodeItem)">{{ canvasNodeItem.label }}</div>
        </div>
        <div class="rightInfo">

        </div>
    </div>
</template>
<script setup>
//引入可拖拽组件
import { VueDraggableNext } from "vue-draggable-next";
//引入画布基础配置信息
import globalConfig from '@/javascript/globalFlowChartConfig'
//使用可拖拽组件
const draggable = VueDraggableNext;
//引入jsplumb插件
import { jsPlumb } from 'jsplumb'
//实例化插件
let plumbInstance = jsPlumb.getInstance()
//定义数据(全局的核心数据)
let infoList = ref([])
//画布节点初始化
let canvasBox = ref(null)
//画布位置坐标自信息
let canvasBoxPositionInfo = ref(null)
//最终的数据
let plumbInfoList = ref([])

//props传值
const props = defineProps({
    //左侧节点信息
    leftNodeList: Array
})

const makeInfo = () => {
    // infoList.value.map(item=>Object.assign(item,globalConfig.readyConfig))
    console.log(infoList.value, '数据信息')
}

const nodeMoveStart = (el) => {
    console.log(el, '鼠标的位置')
}
const nodeMoveEnd = (el) => {
    refreshCanvas()
}
const refreshCanvas = () => {
    canvasBox.value = document.querySelector('.canvasBox')
    console.log(canvasBox.value.getBoundingClientRect(), '画布信息')
    canvasBoxPositionInfo.value = canvasBox.value.getBoundingClientRect()
}
const canvasNodeStyle = (canvasNodeInfo) => {
    return {
        width: '200px',
        height: '40px',
        lineHeight: '40px',
        textAlign: 'center',
        position: 'absolute',
        left: canvasNodeInfo.left + 'px',
        top: canvasNodeInfo.top + 'px',
        border: '1px solid #00a8ff',
    }
}
infoList.value = globalConfig.defaultList
makeInfo()
onMounted(() => {
    nextTick(() => {
        refreshCanvas()
        let renderList = []
        infoList.value.forEach(item => {
            if (item.to && item.to.length > 0) {
                item.to.forEach(v => {
                    let infoObj = Object.assign(globalConfig.readyConfig, {
                        source: item.id,
                        target: v
                    })
                    renderList.push(infoObj)
                })

            }
        })
        plumbInstance.ready(() => {
            renderList.forEach(item=>{
                plumbInstance.connect(item)
            })
        })
    })
})
</script>
<style lang="less" scoped>
.contentBox {
    display: flex;
    height: 600px;
    position: relative;

    .leftMenu {
        width: 220px;
        padding: 10px;

        // background: red;
        h3 {
            text-align: center;
            font-size: 16px;
            font-weight: 600;
            margin-bottom: 10px;
        }

        .nodeItem {
            text-align: center;
            border: 1px dashed #eee;
            line-height: 40px;
            border: 1px dashed rgb(66, 114, 218);
            height: 40px;
            margin-bottom: 10px;
            cursor: pointer;
        }
    }

    .rightInfo {
        width: 200px;
        // background: green;
    }

    .canvasBox {
        flex: 1;
        border: 1px solid #eee;
        height: 600px;
        width: 100%;
        display: block;
        position: relative;
    }
}
</style>