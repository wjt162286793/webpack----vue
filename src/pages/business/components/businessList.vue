<template>
  <div class="exhibition">
    <div class="search">
      <el-input
        v-model.trim="query.name"
        placeholder="输入业务领域名称"
        label="业务领域名称"
        clearable
        @change="reqList"
      />
      <el-input
        v-model.trim="query.user"
        placeholder="输入相关负责人"
        label="相关负责人"
        clearable
        @change="reqList"
      />
      <el-select
        v-model="query.status"
        class="m-2"
        placeholder="选择资产状态"
        @change="reqList"
        clearable
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-button type="primary" @click="reqList">查询</el-button>
      <el-button type="primary" @click="jumpAdd" v-btnRole="'newBusiness'"
        >新增</el-button
      >
      <el-button @click="test1">测试1</el-button>
      <el-button @click="test2">测试2</el-button>
    </div>
    <div class="table">
      <el-table :data="tableData" style="width: 100%" :border="true" stripe>
        <el-table-column label="英文名称" width="240" fixed="left">
          <template #default="scope">
            <el-link type="primary">{{ scope.row.name }}</el-link>
          </template>
        </el-table-column>
        <el-table-column prop="cname" label="中文名称" width="240" />
        <el-table-column prop="user" label="负责人" width="180">
          <!-- <template #default="scope">
            <span>{{ filterUtils(scope.row.user, "user") }}</span>
          </template> -->
        </el-table-column>
        <el-table-column prop="status" label="状态" width="width">
          <template #default="scope">
            <span>{{ filterUtils(scope.row.status, "status") }}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="entiry" label="关联实体">
          <template #default="scope">
            <span>{{ filterUtils(scope.row.entiry, "entiry") }}</span>
          </template>
        </el-table-column> -->
        <el-table-column prop="uuid" label="业务领域编号" width="400" />
        <el-table-column prop="time" label="最后操作时间" width="240" />
        <el-table-column label="操作" fixed="right" width="250">
          <template #default="scope">
            <el-button
              type="primary"
              link
              @click="jumpEdit(scope.row)"
              v-btnRole="'businessEdit'"
            >
              编辑
            </el-button>
            <el-button
              type="danger"
              link
              @click="deleteDialog(scope.row)"
              v-btnRole="'businessEdit'"
            >
              删除
            </el-button>
            <el-button
              v-if="!scope.row.isRisk"
              type="warning"
              link
              @click="openRisk(scope.row)"
            >
              标记风险
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination
        small
        background
        layout="prev, pager, next, jumper, ->, total"
        :total="total"
        class="mt-4"
        v-model:page-size="pageSize"
        v-model:current-page="currentPage"
        @size-change="reqList"
        @current-change="reqList"
        @prev-click="reqList"
        @next-click="reqList"
      >
        <template #pager-text>
          <span>共 {{ total }} 条数据</span>
        </template>
      </el-pagination>
    </div>
  </div>
  <el-dialog v-model="dialogVisible" title="删除" width="30%">
    <span>确定要删除这条资产吗?</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="sure">确定</el-button>
      </span>
    </template>
  </el-dialog>
  <CreatRisk ref="creatRisk" @addRiskSuccess="addRiskSuccess"></CreatRisk>
</template>
<script setup>
import { envname } from "@/javascript/envname";
import { Delete, Edit, WarnTriangleFilled } from "@element-plus/icons-vue";
import CreatRisk from "@/components/creatRisk";
import { useRouter } from "vue-router";
import request from "@/utils/requestUtils";
import dirct from "@/dictionaries/business.json";
import { ElMessage } from "element-plus";
const router = useRouter();
const dialogFormVisible = ref(false);
const formLabelWidth = "140px";
const tableData = ref([]);
const total = ref(0);
// console.log(dirct, "值");
const dialogVisible = ref(false);
const activeRowid = ref(null);
const creatRisk = ref(null);
const form = reactive({
  name: "",
  region: "",
  date1: "",
  date2: "",
  delivery: false,
  type: [],
  resource: "",
  desc: "",
});
let query = reactive({
  name: "",
  user: "",
  status: "",
});
let pageSize = 10;
let currentPage = ref(1);
const filterUtils = (value, flag) => {
  return dirct[flag].find((item) => item.value == value).label;
};
const options = [
  {
    value: 1,
    label: "运营",
  },
  {
    value: 2,
    label: "审批",
  },
  {
    value: 3,
    label: "冻结",
  },
];

const jumpAdd = () => {
  router.push({
    name: "newBusiness",
  });
};
const buttons = [
  { type: "", text: "编辑", value: "edit" },
  { type: "", text: "删除", value: "delete" },
];
const reqList = () => {
  let postData = {
    queryData: toRaw(query),
    pageSize,
    currentPage: currentPage.value,
  };
  request.post(`${envname.apiUrl}/app/business/list`, postData).then((res) => {
    if (res.code === 200) {
      tableData.value = res.data.list;
      total.value = res.data.total;
    }
  });
};
const jumpEdit = (value) => {
  router.push({
    name: "businessEdit",
    query: {
      id: value.id,
    },
  });
};
const deleteDialog = (row) => {
  activeRowid.value = row.id;
  dialogVisible.value = true;
};
const sure = () => {
  request
    .post(`${envname.apiUrl}/app/business/delete`, { id: activeRowid.value })
    .then((res) => {
      if (res.message === "success") {
        ElMessage({
          type: "success",
          message: "删除成功",
        });
        cancel();
      }
    });
};
const cancel = () => {
  dialogVisible.value = false;
  reqList();
};
const openRisk = (record) => {
  creatRisk.value.openDialog(record);
};
const addRiskSuccess = () => {
  reqList();
};
const test1 = () => {
  request.get(`/api/app/person/list`).then((res) => {
    console.log(res, "结果");
  });
};
const test2 = () => {
  request.get(`/newApi/app/person/list`).then((res) => {
    console.log(res, "结果");
  });
};
reqList();
</script>

<style lang="less" scoped>
.exhibition {
  position: relative;
  height: 100%;
  padding-bottom: 50px;
}
.search {
  padding: 10px;
  .el-input,
  .el-select {
    width: 240px;
    margin-right: 20px;
  }
}

.table {
  padding: 10px;
  // max-height: 400px;
  display: grid;
}
.pagination {
  height: 30px;
  position: absolute;
  bottom: 20px;
  right: 0px;
  margin-right: 30px;
}
.operaIcon {
  width: 16px;
  height: 16px;
  margin-right: 10px;
  cursor: pointer;
}
.operaIcon:hover {
  color: var(--text-color2);
}
</style>
