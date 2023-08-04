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
                    <vxe-option v-for="num in 15" :key="num" :value="num" :label="`选项${num}`"></vxe-option>
                </vxe-select>
            </div>
        </div>
        <div class="tableBox">
            <vxe-table
      :align="'left'"
      :data="tableData">
      <vxe-column type="seq" width="60"></vxe-column>
      <vxe-column field="name" title="Name"></vxe-column>
      <vxe-column field="sex" title="Sex"></vxe-column>
      <vxe-column field="age" title="Age"></vxe-column>
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
const query = reactive({
    userName: '',
    name: '',
    role: 1

})
const tableData = ref([
  { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'test abc' },
  { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
  { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
  { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women', age: 24, address: 'Shanghai' }
])
const pageVO2 = reactive({
  currentPage: 1,
  pageSize: 30,
  total: 8
})
request.get('/app/user/userAllList').then(res => {
    if (res.code === 200) {
        console.log(res, '用户列表数据')
    }
})
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
    height: 600px;
}
}

</style>