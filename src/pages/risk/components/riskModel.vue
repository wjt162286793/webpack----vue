<template>
    <globalFlowChart :leftNodeList="leftNodeList" :leftNodeOptionsList="leftNodeOptionsList" @saveFlow="saveFlow" @callBack="callBack" ref="globalFlowChartRef"></globalFlowChart>
</template>
     
<script setup>
import globalFlowChart from '@/components/globalFlowChart.vue'
import {leftNodeList,leftNodeOptionsList} from '../data' 
import request from '@/utils/requestUtils'
import { ElMessage } from 'element-plus'
const router = useRouter()
const route = useRoute()
const globalFlowChartRef = ref(null)

const saveFlow = (info)=>{
console.log(info,'保存的值')
console.log(route.query.id,'保存id')
request.post('/app/risk/saveFlow',{id:route.query.id,flowList:info}).then((res)=>{
    if(res.code === 200){
        ElMessage({
            type:'success',
            message:'保存成功'
        })
    }
})
}
const callBack = ()=>{
console.log('返回不保存')
router.push({name:'riskList'})
}

const reqInfo = ()=>{
    request.post('/app/risk/reqInfo',{id:route.query.id}).then((res)=>{
        if(res.code === 200){
      console.log(res,'请求结果')
      console.log(globalFlowChartRef.value,'----++++')
      globalFlowChartRef.value.getInfoList(res.data.flowList)
    }
    })
}

onMounted(()=>{
    reqInfo()
})
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