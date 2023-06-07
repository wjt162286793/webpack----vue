<template>
    <div class="listContent">
      <div class="searchbox">
        <template v-for="(item,index) in templateData.searchTemplate" :key="index">
            <div v-if="item.type === 'input'">
                <span>{{ item.label }}:</span>
                <el-input v-model="templateData.searchData[item.name]" class="searchItem"></el-input>
            </div>
            <div v-else-if="item.type === 'select'" >
                <span>{{ item.label }}:</span>
                <el-select class="searchItem" v-model="templateData.searchData[item.name]">
                    <el-option v-for="(val,ind) in item.options" :key="ind" :label="val.label" :value="val.value"></el-option>
                </el-select>
            </div>
            <div v-else-if="item.type === 'button'" class="searchBtn">
               <el-button :type="item.btnType" @click="btnClick(item.event)">{{ item.text }}</el-button>
            </div>
        </template>
      </div>
    </div>
</template>
<script setup>

const props = defineProps({
    modeType:String
})
let  templateData = reactive({
        searchTemplate:[
            {
                name:'entiryName',
                type:'input',
                label:'实体名称',
                placeholder:'请输入实体名称',
                show:true,
            },
            {
                name:'entiryType',
                type:'select',
                label:'实体类型',
                placeholder:'请选择实体类型',
                options:[
                    {
                        label:'实物资产',
                        value:1
                    },
                    {
                        label:'机械设备',
                        value:2
                    },
                    {
                        label:'个体资产',
                        value:3
                    },
                    {
                        label:'IT资产',
                        value:4
                    }
                ],
                show:true,
            },
            {
                name:'searchBtn',
                type:'button',
                btnType:'primary',
                text:'查询',
                event:'search'
            },
            {
                name:'addBtn',
                type:'button',
                btnType:'primary',
                text:'新增',
                event:'toAdd'
            }
        ],
        tableTemplate:[],
        pagination:{},
        searchData:{
            entiryName:'222222222',
            entiryType:''
        }
    })
const searchList = ()=>{
    console.log(templateData.searchData,'搜索项')
}
const toAdd = () =>{
    console.log('新增')
}
const btnClick = (btnFlag)=>{
    switch(btnFlag){
        case 'search':
        searchList()
        break
        case 'toAdd':
        toAdd()
    }
}
onMounted(()=>{
    console.log(props.modeType,'多少??')
    console.log(templateData.searchData.entiryName,'????')

})
</script>
<style lang="less">
.listContent{
    height: 100%;
    position: relative;
    margin-bottom: 50px;
    padding: 10px;
    .searchbox{
        display: flex;
        .searchItem{
            width: 240px;
            margin:0 20px 0 10px;
        }
        .searchBtn{
            margin-right: 10px;
        }
    }
}
</style>