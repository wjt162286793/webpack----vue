<template>
  <div class="exhibition">
    <div class="search">
      <el-input
        v-model="query.name"
        placeholder="输入业务领域名称"
        label="业务领域名称"
        clearable
      />
      <el-input
        v-model="query.user"
        placeholder="输入相关负责人"
        label="相关负责人"
        clearable
      />
      <el-select v-model="query.value" class="m-2" placeholder="选择资产状态">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="query.status"
        />
      </el-select>
      <el-button type="primary" @click="reqList">查询</el-button>
      <el-button type="primary" @click="jumpAdd">新增</el-button>
    </div>
    <div class="table">
      <el-table
        :data="tableData"
        style="width: 100%"
        border
        max-height="400"
        stripe
      >
        <el-table-column label="英文名称" width="240" fixed="left">
          <template #default="scope">
            <el-link type="primary">{{ scope.row.name }}</el-link>
          </template>
        </el-table-column>
        <el-table-column prop="cname" label="中文名称" width="240" />
        <el-table-column prop="user" label="负责人" width="180" />
        <el-table-column prop="status" label="状态" width="120" />
        <el-table-column prop="entiry" label="关联实体" width="240" />
        <el-table-column prop="time" label="最后操作时间" width="240" />
        <el-table-column label="Operations" fixed="right" width="120">
          <template #default="scope">
            <el-tooltip
              class="box-item"
              effect="dark"
              content="编辑"
              placement="top"
            >
              <Edit class="operaIcon" />
            </el-tooltip>
            <el-tooltip
              class="box-item"
              effect="dark"
              content="删除"
              placement="top"
            >
              <Delete class="operaIcon" />
            </el-tooltip>
            <span></span>
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
      >
        <template #pager-text>
          <span>共 {{ total }} 条数据</span>
        </template>
      </el-pagination>
    </div>
  </div>
</template>
<script setup>
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import request from "@/utils/requestUtils";
const router = useRouter();
const dialogFormVisible = ref(false);
const formLabelWidth = "140px";
const tableData = ref([]);
const total = ref(0);
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
const query = reactive({
  name: "",
  user: "",
  status: "",
});
const options = [
  {
    value: "1",
    label: "通过",
  },
  {
    value: "2",
    label: "审批",
  },
  {
    value: "3",
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
  request.post("/app/business/list", query).then((res) => {
    if (res.code === 200) {
      tableData.value = res.data.list;
      total.value = res.data.total;
    }
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
  max-height: 400px;
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
