<template>
    <div class="modeBox">
        <div class="searchBox">
            <div class="searchItem"><span class="searchLabel">资产名称</span><el-input class="serachFormItem"
                    v-model="query.name" placeholder="请输入资产名称" /></div>
            <div class="searchItem"><span class="searchLabel">资产编号</span><el-input class="serachFormItem"
                    v-model="query.uuid" placeholder="请输入资产编号" /></div>
                    <el-button type="primary" @click="reqList">查询</el-button>
        </div>
        <div class="tableBox">
            <el-table ref="multipleTableRef" :data="tableData" style="width: 100%" max-height="600"
                :cell-style="{ pading: '15px 0' }" stripe :border="true" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55" />
                <el-table-column label="别名" width="240">
                    <template #default="scope">{{ scope.row.riskAlias }}</template>
                </el-table-column>
                <el-table-column label="资产类别" width="180">
                    <template #default="scope">{{ getType(scope.row.mode) }}</template>
                </el-table-column>
                <el-table-column property="propertyCnName" label="所属资产名称" width="240" />
                <el-table-column property="uuid" label="风险编码" width="width" />
                <el-table-column property="time" label="更改日期" width="240" />
                <el-table-column label="操作" fixed="right" width="180">
          <template #default="scope">
            <el-button
              type="primary"
              :icon="Edit"
              circle
            />
            <el-button
              type="danger"
              :icon="Delete"
              circle
            />
            <el-button
              v-if="!scope.row.isRisk"
              type="warning"
              :icon="WarnTriangleFilled"
              circle
            />
          </template>
        </el-table-column>
            </el-table>
        </div>
        <div class="paginationBox"><el-pagination small background layout="prev, pager, next, jumper, ->, total"
                :total="total" class="mt-4" v-model:page-size="pageSize" v-model:current-page="currentPage"
                @size-change="reqList" @current-change="reqList" @prev-click="reqList" @next-click="reqList" /></div>
    </div>
</template>
  
<script setup>
import { Delete, Edit, WarnTriangleFilled } from "@element-plus/icons-vue";
import { ElTable } from 'element-plus'
import request from "@/utils/requestUtils";
import wordList from '@/dictionaries/wordList.json'
const query = ref({
    name: '',
    uuid: '',
})
let pageSize = 10;
let currentPage = ref(1);
let total = ref(0)
const multipleTableRef = ref()
const multipleSelection = ref([])
const toggleSelection = (rows) => {
    if (rows) {
        rows.forEach((row) => {
            // TODO: improvement typing when refactor table
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            multipleTableRef.value.toggleRowSelection(row, undefined)
        })
    } else {
        multipleTableRef.value.clearSelection()
    }
}
const handleSelectionChange = (val) => {
    multipleSelection.value = val
}

const tableData = ref([])
const getType = (value)=>{
    return wordList.typeList[value] 
}
const reqList = () => {
    let postData = {
        queryData: query.value,
        pageSize: pageSize,
        currentPage: currentPage.value
    }
    request.post('/app/risk/list', postData).then(res => {
        if (res.code === 200) {
            tableData.value = res.data.list;
            total.value = res.data.total;
        }
    })
}
onMounted(() => {
    reqList()
})
</script>
<style lang="less">
.modeBox {
    padding: 12px;
    height: 100%;
    overflow: auto;
    display: flex;
    flex-direction: column;

    .searchBox {
        // background: red;
        margin-bottom: 10px;
        display: flex;

        .searchItem {
            margin-right: 16px;

            .serachFormItem {
                margin-left: 10px;
                width: 200px;
            }
        }

    }

    .tableBox {
        border-top: 1px solid #eee;
        margin: 20px 0;
    }

    .paginationBox {
        display: flex;
        justify-content: flex-end;
    }
}
</style>
  