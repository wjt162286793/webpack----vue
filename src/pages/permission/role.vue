<template>
  <div class="roleBox">
    <p>*超级管理员拥有全部的权限,并且不可更改</p>
    <vxe-button
      type="text"
      status="primary"
      content="保存"
      @click="changeList"
      class="saveBtn"
    ></vxe-button>
    <vxe-table :align="'center'" :data="tableData">
      <vxe-column field="cname" title="角色名称" width="300">
        <template #default="{ row }">
          <span>{{ row.cname }}</span>
        </template>
      </vxe-column>
      <vxe-column field="menuName" title="菜单名称" width="300">
        <template #default="{ row }">
          <div
            class="doneBox"
            v-for="(item, index) in row.menuName"
            :key="index"
          >
            <vxe-checkbox
              v-model="item.flag"
              :content="item.label"
              :indeterminate="item.indeterminate"
              @change="changeCheck1(item, row)"
              :disabled="item.disabled"
            ></vxe-checkbox>
            <!-- <el-checkbox v-model="item.flag" :label="item.label" size="large" /> -->
            <!-- {{ item.label }} -->
          </div>
        </template>
      </vxe-column>
      <vxe-column field="doneName" title="操作名称">
        <template #default="{ row }">
          <div
            v-for="(item, index) in row.doneName"
            :key="index"
            class="doneBox"
          >
            <div v-for="(val, ind) in item" :key="ind" class="doneTypeClass">
              <vxe-checkbox
                v-model="val.flag"
                :content="val.label"
                size="large"
                @change="changeCheck2(val, row)"
                :disabled="val.disabled"
              />
            </div>
          </div>
        </template>
      </vxe-column>
    </vxe-table>
  </div>
</template>
  <script setup>
import { envname } from "@/javascript/envname";
import request from "@/utils/requestUtils";
const tableData = ref([]);
const changeCheck1 = (val, row) => {
  val.indeterminate = false;
  let index = row["doneName"].findIndex((item) => item[0].parent === val.name);
  row["doneName"][index].map((v) => (v.flag = val.flag));
  //  changeList()
};
const changeCheck2 = (val, row) => {
  console.log(val, row, "???");
  let index = row["doneName"].findIndex(
    (item) => item[0].parent === val.parent
  );
  let list = row["doneName"][index];
  let parentIndex = row.menuName.findIndex((item) => item.name === val.parent);
  let parentItem = row.menuName[parentIndex];
  if (list.every((item) => item.flag === true)) {
    parentItem.flag = true;
    parentItem.indeterminate = false;
  } else if (list.every((item) => item.flag === false)) {
    parentItem.flag = false;
    parentItem.indeterminate = false;
  } else if (list.some((item) => item.flag === true)) {
    parentItem.flag = false;
    parentItem.indeterminate = true;
  }
  // changeList()
};
const reqList = () => {
  request.get(`${envname.apiUrl}/app/userRole/roleList`).then((res) => {
    if (res.code === 200) {
      tableData.value = res.data;
    }
  });
};
const changeList = () => {
  request
    .post(`${envname.apiUrl}/app/userRole/updateRole`, {
      data: tableData.value,
    })
    .then((res) => {
      if (res.code === 200) {
        nextTick(() => {
          reqList();
        });
      }
    });
};
reqList();
onMounted(() => {});
onBeforeUnmount(() => {
  // changeList()
});
</script>
  <style scoped lang="less">
.roleBox {
  position: relative;
  padding-top: 30px;
  p {
    color: #fd1030;
    position: absolute;
    top: 0px;
    left: 10px;
  }
  .saveBtn {
    position: absolute;
    right: 10px;
    top: 0px;
  }
}
.columnBox {
  border: 1px solid #e6e8ec;
  border-top: none;
  padding: 10px;
}
.doneBox {
  border: 1px solid #e6e8ec;
  height: 40px;
  line-height: 39px;
}
.doneTypeClass {
  margin-right: 20px;
  display: inline-block;
}
.vxe-header--column {
  height: 50px !important;
}
::v-deep(.vxe-body--column) {
  padding: 0px !important;
}
::v-deep(.vxe-cell) {
  padding-left: 0px !important;
  padding-right: 0px !important;
}
</style>