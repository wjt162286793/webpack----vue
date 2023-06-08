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
        <template v-for="(item, index) in templateData.tableTemplate" :key="index">
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
import request from "@/utils/requestUtils";
import { useRouter} from "vue-router";
const props = defineProps({
  modeType: String,
});
const router  = useRouter()
let multipleTableRef = ref(null);
let templateData = reactive({});
let reqTemplate = () =>{
    request.post('/app/publicList/template',{name:props.modeType}).then(res=>{
    templateData.searchTemplate =  res.data.searchTemplate
    templateData.searchData = res.data.searchData
    templateData.tableTemplate = res.data.tableTemplate
    reqList()
})
}
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
  console.log(props.modeType)
  router.push({
    name:`${props.modeType}Add`,
  })

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
    reqTemplate()
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