<template>
  <div class="listContent">
    <div class="searchbox">
      <template
        v-for="(item, index) in templateData.searchTemplate"
        :key="index"
      >
        <div v-if="item.type === 'input'">
          <!-- <span>{{ item.label }}:</span> -->
          <el-input
            v-model="templateData.searchData[item.name]"
            class="searchItem"
            :placeholder="item.placeholder"
          ></el-input>
        </div>
        <div v-else-if="item.type === 'select'">
          <!-- <span>{{ item.label }}:</span> -->
          <el-select
            class="searchItem"
            v-model="templateData.searchData[item.name]"
            :placeholder="item.placeholder"
          >
            <el-option
              v-for="(val, ind) in item.options"
              :key="ind"
              :label="val.label"
              :value="val.value"
            ></el-option>
          </el-select>
        </div>
        <div v-else-if="item.type === 'button'" class="searchBtn">
          <el-button :type="item.btnType" @click="btnClick(item.event)">{{
            item.text
          }}</el-button>
        </div>
      </template>
    </div>
    <div class="tableBox">
      <el-table
        :border="true"
        ref="multipleTableRef"
        :data="tableData"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <!-- <el-table-column type="selection" width="55" />
                <el-table-column label="Date" width="120">
                    <template #default="scope">{{ scope.row.date }}</template>
                </el-table-column>
                <el-table-column property="name" label="Name" width="120" />
                <el-table-column property="address" label="Address" show-overflow-tooltip /> -->
        <template v-for="(item, index) in tableHeader" :key="index">
          <el-table-column
            v-if="!item.scoped"
            :property="item.property"
            :width="item.width"
            :label="item.label"
          ></el-table-column>
          <el-table-column v-else :width="item.width" :label="item.label">
            <template #default="scope">
              {{ scope.row[item.property] }}
            </template>
          </el-table-column>
        </template>
        <el-table-column :width="240" label="操作" fixed="right">
          <template #default="scope">
            <!-- {{scope.row[item.property]}} -->
            <el-button
              type="primary"
              :icon="Edit"
              circle
              @click="editRow(scope.row)"
            />
            <el-button
              type="danger"
              :icon="Delete"
              circle
              @click="deleteRow(scope.row)"
            />
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
</template>
<script setup>
import { Delete, Edit } from "@element-plus/icons-vue";
const props = defineProps({
  modeType: String,
});
let multipleTableRef = ref(null);
let templateData = reactive({
  searchTemplate: [
    {
      name: "entiryName",
      type: "input",
      label: "实体名称",
      placeholder: "请输入实体名称",
      show: true,
    },
    {
      name: "entiryType",
      type: "select",
      label: "实体类型",
      placeholder: "请选择实体类型",
      options: [
        {
          label: "实物资产",
          value: 1,
        },
        {
          label: "机械设备",
          value: 2,
        },
        {
          label: "个体资产",
          value: 3,
        },
        {
          label: "IT资产",
          value: 4,
        },
      ],
      show: true,
    },
    {
      name: "searchBtn",
      type: "button",
      btnType: "primary",
      text: "查询",
      event: "search",
    },
    {
      name: "addBtn",
      type: "button",
      btnType: "primary",
      text: "新增",
      event: "toAdd",
    },
  ],
  tableTemplate: [],
  pagination: {},
  searchData: {
    entiryName: "",
    entiryType: "",
  },
});
let tableHeader = ref([
  {
    property: "date",
    label: "日期",
    width: 200,
    scope: false,
  },
  {
    property: "name",
    label: "姓名",
    width: 200,
    scope: false,
  },
  {
    property: "address",
    label: "地址",
    width: "width",
    scope: false,
  },
]);
const tableData = ref([]);
const total = ref(0);
let pageSize = 10;
let currentPage = ref(1);
const handleSelectionChange = (val) => {
  //   multipleSelection.value = val
};
const reqList = () => {
  // console.log(templateData.searchData,'搜索项')
  tableData.value = [
    {
      date: "2016-05-03",
      name: "Tom",
      address: "No. 189, Grove St, Los Angeles",
    },
    {
      date: "2016-05-02",
      name: "Tom",
      address: "No. 189, Grove St, Los Angeles",
    },
  ];
};

const toAdd = () => {
  console.log("新增");
};
const btnClick = (btnFlag) => {
  switch (btnFlag) {
    case "search":
      reqList();
      break;
    case "toAdd":
      toAdd();
  }
};

const editRow = (row) => {
  console.log(row, "编辑");
};
const deleteRow = (row) => {
  console.log(row, "删除");
};
onMounted(() => {
  console.log(props.modeType, "多少??");
  console.log(templateData.searchData.entiryName, "????");
  console.log(multipleTableRef, "表格");
});
</script>
<style lang="less">
.listContent {
  height: 100%;
  position: relative;
  margin-bottom: 50px;
  padding: 10px;

  .searchbox {
    display: flex;

    .searchItem {
      width: 240px;
      margin: 0 20px 0 0px;
    }

    .searchBtn {
      margin-right: 10px;
      margin-bottom: 20px;
    }
  }
  .pagination {
    height: 30px;
    position: absolute;
    bottom: 20px;
    right: 0px;
    margin-right: 30px;
  }
}
</style>