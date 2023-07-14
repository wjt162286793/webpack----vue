<template>
    <div class="modeBox">
        <div class="searchBox">
            <div class="searchItem"><span class="searchLabel">资产名称</span><el-input class="serachFormItem"
                    v-model="query.name" placeholder="请输入资产名称" /></div>
            <div class="searchItem"><span class="searchLabel">资产编号</span><el-input class="serachFormItem"
                    v-model="query.uuid" placeholder="请输入资产编号" /></div>
            </div>
        <div class="tableBox">
            <el-table ref="multipleTableRef" :data="tableData" style="width: 100%"
                @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55" />
                <el-table-column label="Date" width="240">
                    <template #default="scope">{{ scope.row.date }}</template>
                </el-table-column>
                <el-table-column property="name" label="Name" width="240" />
                <el-table-column property="address" label="Address" show-overflow-tooltip />
            </el-table>
        </div>
        <div class="paginationBox"><el-pagination background layout="prev, pager, next" :total="1000" /></div>
        <!-- <div style="margin-top: 20px">
            <el-button @click="toggleSelection([tableData[1], tableData[2]])">Toggle selection status of second and third
                rows</el-button>
            <el-button @click="toggleSelection()">Clear selection</el-button>
        </div> -->
    </div>
</template>
  
<script setup>
import { ElTable } from 'element-plus'

const query = ref({
    name: '',
    uuid:''
})
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

const tableData = [
    {
        date: '2016-05-03',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-02',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-04',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-01',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-08',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-06',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-07',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
]
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
    .tableBox{
        border-top: 1px solid #eee;
    }
}
</style>
  