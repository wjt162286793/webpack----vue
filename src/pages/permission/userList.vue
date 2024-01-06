<template>
  <div class="mainBox">
    <div class="search">
      <div class="searchItem">
        <span class="searchLable">用户名:</span
        ><vxe-input
          v-model="query.userName"
          placeholder="输入用户名"
          size="small"
          type="search"
          clearable
          @clear="reqList"
          @search-click="reqList"
        ></vxe-input>
      </div>
      <div class="searchItem">
        <span class="searchLable">用户账号:</span>
        <vxe-input
          v-model="query.name"
          placeholder="输入用户账号"
          size="small"
          type="search"
          clearable
          @clear="reqList"
          @search-click="reqList"
        ></vxe-input>
      </div>
      <div class="searchItem">
        <span class="searchLable">用户角色:</span>
        <vxe-select
          v-model="query.role"
          placeholder="选择用户角色"
          size="small"
          @change="reqList"
        >
          <vxe-option
            v-for="(item, index) in roleList"
            :key="index"
            :value="item.name"
            :label="item.cname"
          ></vxe-option>
        </vxe-select>
      </div>
      <div class="searchItem">
        <vxe-button
          status="primary"
          content="查询"
          size="small"
          @click="reqList"
        ></vxe-button>
      </div>
    </div>
    <div class="tableBox">
      <vxe-table :align="'left'" :data="tableData">
        <vxe-column field="userName" title="用户中文名"></vxe-column>
        <vxe-column field="name" title="用户账号"></vxe-column>
        <vxe-column title="用户角色">
          <template #default="{ row }">
            <span>
              {{ getRoleValue(row.role) }}
            </span>
          </template>
        </vxe-column>
        <vxe-column title="操作" width="200" show-overflow>
          <template #default="{ row }">
            <vxe-button type="text" status="primary" @click="openDia(row)"
              >编辑</vxe-button
            >
          </template>
        </vxe-column>
      </vxe-table>
    </div>
    <vxe-pager
      background
      v-model:current-page="pageInfo.currentPage"
      v-model:page-size="pageInfo.pageSize"
      :total="total"
      :layouts="[
        'PrevJump',
        'PrevPage',
        'JumpNumber',
        'NextPage',
        'NextJump',
        'Sizes',
        'FullJump',
        'Total',
      ]"
    >
    </vxe-pager>
  </div>
  <vxe-modal v-model="visiable">
    <div>
      <p>
        姓名:
        <vxe-input
          v-model="rowInfo.userName"
          disabled
          size="small"
          class="modelItem"
        ></vxe-input>
      </p>
      <p>
        角色:
        <vxe-select
          v-model="rowInfo.role"
          placeholder="选择用户角色"
          size="small"
          class="modelItem"
        >
          <vxe-option
            v-for="(item, index) in roleList"
            :key="index"
            :value="item.name"
            :label="item.cname"
          ></vxe-option>
        </vxe-select>
      </p>
      <div class="footer">
        <vxe-button size="small" @click="visiable = false" class="btn"
          >取消</vxe-button
        >
        <vxe-button status="primary" size="small" @click="saveRole" class="btn"
          >确定</vxe-button
        >
      </div>
    </div>
  </vxe-modal>
</template>
<script setup>
import request from "@/utils/requestUtils";
import { envname } from "@/javascript/envname";
//角色列表
const roleList = ref([]);
const reqRoleList = () => {
  request.get(`${envname.apiUrl}/app/userRole/roleList`).then((res) => {
    if (res.code === 200) {
      roleList.value = res.data;
      roleList.value.unshift({
        name: "",
        cname: "全部",
      });
      reqList();
    }
  });
};
const getRoleValue = (val) => {
  let value = roleList.value.find((item) => item.name === val);
  if (value) {
    return value.cname;
  }
  //   return roleList.value.find(item=>item.name === val)['cname']
  return val;
};
reqRoleList();

//查询列表
const query = reactive({
  userName: "",
  name: "",
  role: "",
});
const pageInfo = reactive({
  currentPage: 1,
  pageSize: 10,
});
const total = ref(8);
const tableData = ref([]);
const reqList = () => {
  request
    .post(`${envname.apiUrl}/app/userRole/userlist`, { query, pageInfo })
    .then((res) => {
      if (res.code === 200) {
        tableData.value = res.data.list;
        total.value = res.data.total;
      }
    });
};

const rowInfo = ref({});
const visiable = ref(false);
const openDia = (row) => {
  rowInfo.value = row;
  visiable.value = true;
};
const saveRole = () => {
  request
    .post(`${envname.apiUrl}/app/userRole/updateUserRole`, {
      data: rowInfo.value,
    })
    .then((res) => {
      if (res.code === 200) {
        visiable.value = false;
        nextTick(() => {
          reqList();
        });
      }
    });
};
</script>
<style lang="less" scoped>
.mainBox {
  .search {
    display: flex;

    .searchItem {
      margin-right: 10px;

      .searchLable {
        margin: 0 10px;
      }
    }
  }

  .tableBox {
    margin-top: 20px;
    height: 560px;
  }
}
p {
  text-align: center;
  .modelItem {
    width: 200px;
    margin: 10px 20px;
  }
}
.footer {
  margin-top: 10px;
  display: flex;
  justify-content: flex-end;
  .btn {
    width: 60px;
  }
}
</style>