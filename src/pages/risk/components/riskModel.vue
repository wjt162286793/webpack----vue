<template>
    <globalFlowChart :leftNodeList="leftNodeList" :leftNodeOptionsList="leftNodeOptionsList"></globalFlowChart>
</template>
     
<script setup>
import globalFlowChart from '@/components/globalFlowChart.vue'
import {leftNodeList,leftNodeOptionsList} from '../data' 
</script>
<style lang="less" scoped>
.modelBox {
    display: flex;
    flex-direction: column;
    width: 100%;

    .footer {
        height: 30px;
        margin-top: 20px;
        display: flex;
        justify-content: center;
    }

    .tabBox {
        flex: 1;
    }
}
</style>