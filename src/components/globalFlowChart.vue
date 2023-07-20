<template>
    <div class="contentBox">
        <div class="leftMenu">
            <h3>流程节点</h3>
            <draggable @start="nodeMoveStart" @end="nodeMoveEnd" v-model="leftNodeList">
                <div v-for="(nodeItem, nodeIndex) in leftNodeList" :key="nodeItem.nodeId" class="nodeItem">{{ nodeItem.label
                }}</div>
            </draggable>
        </div>
        <div class="canvasBox" id="canvasBox">

        </div>
        <div class="rightInfo">

        </div>
    </div>
</template>
<script setup>
import { nextTick } from "vue";
import { VueDraggableNext } from "vue-draggable-next";
const draggable = VueDraggableNext;
let canvasBox = ref(null)
let canvasBoxPositionInfo = ref(null)
const leftNodeList = [
    {
        label: '风险提交',
        nodeId: 1,
    },
    {
        label: '审核通过',
        nodeId: 2
    },
    {
        label: '缺陷改造',
        nodeId: 3
    },
    {
        label: '检查核定',
        nodeId: 4
    },
    {
        label: '注销提交',
        nodeId: 5
    }
]
const nodeMoveStart = (el) => {
    console.log(el, '鼠标的位置')
}
const nodeMoveEnd = (el) => {
    refreshCanvas()
}
const refreshCanvas = ()=>{
    canvasBox.value = document.querySelector('.canvasBox')
    console.log(canvasBox.value.getBoundingClientRect(),'画布信息')
    canvasBoxPositionInfo.value = canvasBox.value.getBoundingClientRect()
}
onMounted(() => {
    nextTick(()=>{
        refreshCanvas()
    })
})
</script>
<style lang="less" scoped>
.contentBox {
    display: flex;
    height: 600px;
    position: relative;
    .leftMenu {
        width: 200px;
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
    }
}</style>