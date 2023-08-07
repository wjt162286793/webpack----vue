<template>
    <div class="mainBox">
        <div class="search">
            <div class="searchItem">
                <span class="searchLable">用户名:</span><vxe-input v-model="query.userName" placeholder="输入用户名" size="small"></vxe-input>
            </div>
            <div class="searchItem">
                <span class="searchLable">用户账号:</span> <vxe-input v-model="query.name" placeholder="输入用户账号" size="small"></vxe-input>
            </div>
            <div class="searchItem">
               <span class="searchLable">用户角色:</span> <vxe-select v-model="query.role" placeholder="选择用户角色" size="small">
                    <vxe-option v-for="(item,index) in roleList" :key="index" :value="item.name" :label="item.cname"></vxe-option>
                </vxe-select>
            </div>
            <div class="searchItem">
                <vxe-button status="primary" content="查询" size="small"></vxe-button>
            </div>
        </div>
        <div class="tableBox">
            <vxe-table
      :align="'left'"
      :data="tableData">
      <vxe-column field="name" title="用户账号"></vxe-column>
      <vxe-column field="userName" title="用户中文名"></vxe-column>
      <vxe-column title="用户权限">
        <template #default="{row}">
          <span>
            {{ getRoleValue(row.role) }}
          </span>
        </template>
      </vxe-column>
      <vxe-column title="操作" width="120" show-overflow>
        <template #default="{row}">
           <vxe-button type="text" status="primary">编辑</vxe-button>
        </template>
      </vxe-column>
    </vxe-table>
        </div>
        <vxe-pager
      background
      v-model:current-page="pageVO2.currentPage"
      v-model:page-size="pageVO2.pageSize"
      :total="pageVO2.total"
      :layouts="['PrevJump', 'PrevPage', 'JumpNumber', 'NextPage', 'NextJump', 'Sizes', 'FullJump', 'Total']">
    </vxe-pager>
    </div>
</template>
<script setup>
import request from '@/utils/requestUtils';
const roleList = ref([])
const query = reactive({
    userName: '',
    name: '',
    role: 'all'

})
const tableData = ref([
//   { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'test abc' },
//   { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
//   { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
//   { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women', age: 24, address: 'Shanghai' }
])
const pageVO2 = reactive({
  currentPage: 1,
  pageSize: 30,
  total: 8
})
request.get('/app/userRole/roleList').then(res=>{
    if(res.code === 200){
        console.log(res,'角色数据')
        roleList.value = res.data
        roleList.value.unshift({
            name:'all',
            cname:'全部'
        })
        reqList()
    }
})
const reqList = ()=>{
    request.post('/app/userRole/userlist',query).then(res => {
    if (res.code === 200) {
        tableData.value = res.data
        console.log(res, '用户列表数据')
    }
})
}
const getRoleValue = (val)=>{
  console.log(val,'小智')
  let value = roleList.value.find(item=>item.name === val)
  console.log(value,'值---')
  if(value){
    return value.cname
  }
//   return roleList.value.find(item=>item.name === val)['cname']
return val
}
</script>
<style lang="less" scoped>
.mainBox{
    .search{
    display: flex;
    
    .searchItem{
        margin-right: 10px;
        .searchLable{
            margin: 0 10px;
        }
    }
}
.tableBox{
    margin-top: 20px;
    height: 560px;
}
}

</style>