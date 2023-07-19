<template>
    <div class="modeBox">
        <div class="searchBox">
            <div class="searchItem">
                <span class="searchLabel">资产名称</span><el-input @change="reqList" clearable class="serachFormItem"
                    v-model="query.name" placeholder="请输入资产名称" />
            </div>
            <div class="searchItem">
                <span class="searchLabel">资产编号</span><el-input @change="reqList" clearable class="serachFormItem"
                    v-model="query.uuid" placeholder="请输入资产编号" />
            </div>
            <div class="searchItem">
                <span class="searchLabel">风险等级</span>
                <el-select clearable v-model="query.riskLevel" class="serachFormItem" @change="reqList">
                    <el-option v-for="item in riskWordlist.riskLevelOptions" :key="item.value" :label="item.label"
                        :value="item.value" />
                </el-select>
            </div>
            <div class="searchItem">
                <el-button type="primary" @click="reqList">查询</el-button>
                <el-button type="primary" @click="downLoad" v-show="selectionDoneFlag">下载</el-button>
            </div>
        </div>
        <div class="tableBox">
            <el-table @select="selectionHandler" ref="multipleTableRef" :data="tableData" style="width: 100%"
                max-height="600" :cell-style="{ pading: '15px 0' }" stripe :border="true"
                @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55" />
                <el-table-column label="别名" width="240">
                    <template #default="scope">{{ scope.row.riskAlias }}</template>
                </el-table-column>
                <el-table-column label="资产类别" width="180">
                    <template #default="scope">{{ getType(scope.row.mode) }}</template>
                </el-table-column>
                <el-table-column label="当前状态" width="180">
                    <template #default="scope">{{ getRiskType(scope.row.status) }}</template>
                </el-table-column>
                <el-table-column property="propertyCnName" label="所属资产名称" width="240" />
                <el-table-column property="uuid" label="风险编码" width="400" />
                <el-table-column property="time" label="更改日期" width="240" />
                <el-table-column label="操作" fixed="right" width="180">
                    <template #default="scope">
                        <el-button type="primary" :icon="View" circle @click="openDrawer(scope.row)" />
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="paginationBox">
            <el-pagination small background layout="prev, pager, next, jumper, ->, total" :total="total" class="mt-4"
                v-model:page-size="pageSize" v-model:current-page="currentPage" @size-change="reqList"
                @current-change="reqList" @prev-click="reqList" @next-click="reqList" />
        </div>
    </div>
    <el-drawer v-model="drawer" :direction="direction" size="75%">
        <template #header>
            <h3>风险资产详情</h3>
        </template>
        <template #default>
            <h4>基础信息</h4>
            <div class="rowBox">
                <el-row>
                    <el-col :span="2">
                        <h5>风险别名:</h5>
                    </el-col>
                    <el-col :span="10">{{ activeRecord.riskAlias }}</el-col>
                    <el-col :span="2">
                        <h5>风险编号:</h5>
                    </el-col>
                    <el-col :span="10">{{ activeRecord.uuid }}</el-col>
                    <el-col :span="2">
                        <h5>资产名称:</h5>
                    </el-col>
                    <el-col :span="10">{{ activeRecord.propertyName }}</el-col>
                    <el-col :span="2">
                        <h5>风险定位:</h5>
                    </el-col>
                    <el-col :span="10">
                        <el-tag type="success">{{ getriskPostion(activeRecord.riskPosition) }}</el-tag>
                    </el-col>
                    <el-col :span="2">
                        <h5>资产类型:</h5>
                    </el-col>
                    <el-col :span="10">{{ getInfoType(activeRecord.mode) }}</el-col>
                    <el-col :span="2">
                        <h5>资产编号:</h5>
                    </el-col>
                    <el-col :span="10">{{ activeRecord.propertyId }}</el-col>
                    <el-col :span="2">
                        <h5>风险等级:</h5>
                    </el-col>
                    <el-col :span="10">
                        <el-tag>{{ getLevel(activeRecord.riskLevel) }}</el-tag>
                    </el-col>
                    <el-col :span="2">
                        <h5>资产状态:</h5>
                    </el-col>
                    <el-col :span="10">
                        <el-tag type="warning">{{ getInfoStatus(activeRecord.status) }}</el-tag>
                    </el-col>
                    <el-col :span="2">
                        <h5>监控粒度:</h5>
                    </el-col>
                    <el-col :span="10">
                        <el-tag>{{ getSize(activeRecord.controlSize) }}</el-tag>
                    </el-col>
                    <el-col :span="2">
                        <h5>监控时间:</h5>
                    </el-col>
                    <el-col :span="10">{{ activeRecord.times[0] }} &nbsp;&nbsp;至&nbsp;&nbsp; {{
                        activeRecord.times[1] }}</el-col>
                    <el-col :span="2">
                        <h5>审核人员:</h5>
                    </el-col>
                    <el-col :span="10">
                        {{ activeRecord.auditUser }}
                    </el-col>
                    <el-col :span="2">
                        <h5>通知方式:</h5>
                    </el-col>
                    <el-col :span="10">
                        <el-tag v-for="(m, n) in activeRecord.inform" :key="n" style="margin-right: 10px;">{{ m }}</el-tag>
                    </el-col>
                </el-row>
            </div>
            <h4>处理进程</h4>
            <div class="rowBox">
                <el-steps :active="activeRecord.progress" align-center>
                    <el-step title="风险提交" />
                    <el-step title="审批通过" />
                    <el-step title="缺陷改造" />
                    <el-step title="检查核定" />
                    <el-step title="注销提交" />
                </el-steps>
            </div>
            <h4>操作记录</h4>
            <div class="rowBox">
                <el-table :data="activeRecord.recordList" style="width: 100%">
                    <el-table-column prop="name" label="操作名称" width="180" />
                    <el-table-column  label="操作人员" width="180">
                        <template #default="scope">
                           {{ scope.user.userName }}
                        </template>
                    </el-table-column>
                    <el-table-column prop="time" label="操作时间" width="width"/>
                </el-table>
            </div>
            <div>

            </div>
        </template>
        <template #footer>
            <div style="flex: auto">
                <el-button @click="closeDrawer">返回</el-button>
            </div>
        </template>
    </el-drawer>
</template>
  
<script setup>
import { View } from "@element-plus/icons-vue";
import { ElTable } from "element-plus";
import request from "@/utils/requestUtils";
import wordList from "@/dictionaries/wordList.json";
import riskWordlist from "@/dictionaries/risk.json";
const query = ref({
    name: "",
    uuid: "",
    riskLevel: "",
});
let pageSize = 10;
let currentPage = ref(1);
let total = ref(0);
const multipleTableRef = ref(null);
const drawer = ref(false)
const direction = ref('rtl')
const multipleSelection = ref([]);
const selectionData = ref([]);
const activeRecord = ref({})
let selectionDoneFlag = ref(false)
const toggleSelection = (rows) => {
    if (rows) {
        rows.forEach((row) => {
            // TODO: improvement typing when refactor table
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            multipleTableRef.value.toggleRowSelection(row, undefined);
        });
    } else {
        multipleTableRef.value.clearSelection();
    }
};
const handleSelectionChange = (val) => {
    multipleSelection.value = val;
};

const tableData = ref([]);
const getType = (value) => {
    return wordList.typeList[value];
};
const getRiskType = (value) => {
    return riskWordlist['status'][value]
}
const reqList = () => {
    let postData = {
        queryData: query.value,
        pageSize: pageSize,
        currentPage: currentPage.value,
    };
    request.post("/app/risk/list", postData).then((res) => {
        if (res.code === 200) {
            tableData.value = res.data.list;
            total.value = res.data.total;
        }
    });
};
const openDrawer = (row) => {
    activeRecord.value = row
    drawer.value = true
}
const selectionHandler = (selection, row) => {
    selectionData.value = selection;
    if (selectionData.value.length < 1) {
        selectionDoneFlag.value = false
    } else {
        selectionDoneFlag.value = true
    }
};
const downLoad = () => {
    console.log(selectionData.value, "选中的数据");
    let content = JSON.stringify(selectionData.value)
    let blob_file = new Blob([content], { type: 'application/json;charset=utf-8' })
    let downLoadElement = document.createElement('a')
    let href = URL.createObjectURL(blob_file)
    downLoadElement.href = href
    downLoadElement.download = '风险资产.json'
    document.body.appendChild(downLoadElement)
    downLoadElement.click()
    document.body.removeChild(downLoadElement)
    window.URL.revokeObjectURL(href)
};
const closeDrawer = () => {
    drawer.value = false
}
const getriskPostion = (info) => {
    return riskWordlist.riskPositionList.find(item => item.value === info).label
}
const getInfoType = (info) => {
    return wordList['typeList'][info]
}
const getLevel = (info) => {
    return riskWordlist.riskLevelOptions.find(item => item.value === info).label
}
const getInfoStatus = (info) => {
    return riskWordlist.status[info]
}
const getSize = (info) => {
    return riskWordlist.controlSizeList.find(item => item.value === info).label
}
onMounted(() => {
    reqList();
});
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

h4 {
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 20px;
}

.rowBox {
    .el-col {
        margin-bottom: 30px;

        h5 {
            font-size: 16px;
            font-weight: 400;
        }
    }
}
</style>
  