<template>
  <div class="formBox">
    <h4>基本信息</h4>
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="rules"
      label-width="120px"
      class="demo-ruleForm"
      status-icon
    >
      <el-row>
        <el-col :span="12">
          <el-form-item label="英文名称" prop="name">
            <el-input
              disabled
              v-model="ruleForm.name"
              class="formItem"
              placeholder="请输入业务领域英文名称"
              clearable
            /> </el-form-item
        ></el-col>
        <el-col :span="12">
          <el-form-item label="中文名称" prop="cname">
            <el-input
              v-model="ruleForm.cname"
              class="formItem"
              placeholder="请输入业务领域中文名"
              clearable
            /> </el-form-item
        ></el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="指定负责人" prop="user">
            <el-select
              v-model="ruleForm.user"
              placeholder="请选择资产负责人"
              class="formItem"
              clearable
            >
              <el-option
                v-for="(item, index) in userList"
                :key="index"
                :label="item.label"
                :value="item.value"
              />
            </el-select> </el-form-item
        ></el-col>
        <el-col :span="12">
          <el-form-item label="资产类型" prop="type">
            <el-select
              v-model="ruleForm.type"
              placeholder="请选择资产类型"
              class="formItem"
              clearable
            >
              <el-option
                v-for="(item, index) in typeOptions"
                :key="index"
                :label="item.label"
                :value="item.value"
              ></el-option> </el-select></el-form-item
        ></el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="关联实体" prop="entiry">
            <el-select
              v-model="ruleForm.entiry"
              placeholder="请选择关联实体"
              class="formItem"
              clearable
            >
              <el-option
                v-for="(item, index) in entiryList"
                :key="index"
                :label="item.label"
                :value="item.value"
              />
            </el-select> </el-form-item
        ></el-col>
        <el-col :span="12">
          <el-form-item label="资产描述" prop="dsc">
            <el-input
              v-model="ruleForm.dsc"
              :rows="4"
              type="textarea"
              placeholder="请输入资产描述"
              class="formItem"
              clearable
            /> </el-form-item
        ></el-col>
      </el-row>
      <div class="footer">
        <el-button type="primary" @click="submitForm(ruleFormRef)">
          提交
        </el-button>
        <el-button @click="goBack">返回</el-button>
      </div>
    </el-form>
    <h4>模型图</h4>
    <div class="btnList">
      <el-button type="primary" @click="openDrawer('new')"
        >创建模型图方案</el-button
      >
    </div>
    <el-table
      ref="multipleTableRef"
      :data="ruleForm.modelList"
      style="width: 100%"
    >
      <el-table-column property="scenarioName" label="模型图名称" width="240" />
      <el-table-column
        property="modeType"
        label="模型规范"
        width="240"
        show-overflow-tooltip
      >
        <template #default="scope">
          <span>{{ filterModeType(scope) }}</span>
        </template>
      </el-table-column>
      <el-table-column property="id" label="id" width="width" />
      <el-table-column label="操作" width="240">
        <template #default="scope">
          <el-button type="primary" link @click="openDrawer(scope)"
            >编辑</el-button
          >
          <el-button type="danger" link @click="deleteRow(scope)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <div class="footer">
      <el-button type="primary" @click="submitForm(ruleFormRef)">
        保存
      </el-button>
      <el-button @click="goBack">返回</el-button>
    </div>
  </div>
  <el-drawer v-model="drawer" direction="rtl" size="85%" destroy-on-close>
    <template #header>
      <h4 style="margin-bottom: 0px">{{ drawerTitle }}</h4>
    </template>
    <template #default>
      <Visual ref="VisualCom"></Visual>
    </template>
    <template #footer>
      <div style="flex: auto">
        <el-button @click="cancelClick">取消</el-button>
        <el-button type="primary" @click="confirmClick">保存</el-button>
      </div>
    </template>
  </el-drawer>
</template>

<script setup>
import * as VueRouter from "vue-router"
import request from "@/utils/requestUtils";
import { ElMessage } from "element-plus";
import Visual from "./visual.vue";
import { v4 as uuidv4 } from "uuid";
import { Delete, Edit } from "@element-plus/icons-vue";
import datas from "../data.json";
import word from "@/dictionaries/business.json";
import { onMounted } from "vue";

let ruleForm = reactive({
  name: "",
  cname: "",
  user: "",
  region: null,
  entiry: null,
  dcs: "",
  type: null,
  status: 1,
  mode: "business",
});
const route = VueRouter.useRoute();
const router = VueRouter.useRouter();
const ruleFormRef = ref(null);
let VisualCom = ref(null);
const openFlag = ref("new");
let drawer = ref(false);
let drawerTitle = ref("新建模型方案");
let rowIndex = ref(0);
let typeOptions = datas.type;
let userList = ref([]);
let entiryList = ref([]);
const rules = reactive({
  name: [
    {
      required: true,
      message: "请输入业务领域英文名称",
      trigger: "blur",
    },
    { min: 3, max: 20, message: "Length should be 3 to 5", trigger: "blur" },
  ],
  cname: [
    {
      required: true,
      message: "请输入业务领域中文名称",
      trigger: "blur",
    },
    { min: 3, max: 10, message: "Length should be 3 to 5", trigger: "blur" },
  ],
  user: [
    {
      required: true,
      message: "请选择资产负责人",
      trigger: "change",
    },
  ],
  type: [
    {
      required: true,
      message: "请选择资产类型",
      trigger: "change",
    },
  ],
});
const filterModeType = (scope) => {
  console.log(word.typeOptions, scope.row.modeType, "???什么");
  return word.typeOptions.find((item) => item.value === scope.row.modeType)[
    "label"
  ];
};
const submitForm = (formEl) => {
  if (!formEl) return;
  formEl.validate((valid, fields) => {
    if (valid) {
      console.log(ruleForm, "结果");
      request.post(`/app/business/change`, ruleForm).then((res) => {
        if (res.code === 200) {
          ElMessage({
            message: "修改成功",
            type: "success",
          });
          goBack();
        } else if (res.code === 201) {
          ElMessage({
            message: res.message,
            type: "warning",
          });
        }
      });
    } else {
      console.log("error submit!", fields);
    }
  });
};

const resetForm = (formEl) => {
  if (!formEl) return;
  formEl.resetFields();
};

const goBack = () => {
  router.push({
    name: "businessList",
  });
};

const getLists = () => {
  request.get(`/app/user/userAllList`).then((res) => {
    if (res.code == 200) {
      userList.value = res.data;
    }
  });
  request.post(`/app/publicApi/all`, { mode: "entiry" }).then((res) => {
    if (res.code == 200) {
      res.data.forEach((item) => {
        entiryList.value.push({
          label: item.entiryCnName,
          value: item.uuid,
        });
      });
    }
  });
};

const getInfo = () => {
  request.post(`/app/business/Info`, { id: route.query.id }).then((res) => {
    // console.log(res, "获取到资产具体信息");
    // ruleForm = res.data;
    // console.log(ruleForm, "具体信息");
    if (res.message === "success") {
      ruleForm.name = res.data.name;
      ruleForm.cname = res.data.cname;
      ruleForm.user = res.data.user;
      ruleForm.region = res.data.region;
      ruleForm.entiry = res.data.entiry;
      ruleForm.dsc = res.data.dsc;
      ruleForm.type = res.data.type;
      ruleForm.status = res.data.status;
      ruleForm.id = res.data.id;
      ruleForm.modelList = res.data.modelList;
      ruleForm.mode = res.data.mode;
    }
  });
};

const handleSelectionChange = (val) => {
  multipleSelection.value = val;
};
const multipleSelection = ref([]);

const openDrawer = (flag) => {
  openFlag.value = flag;
  drawer.value = true;
  nextTick(() => {
    if (flag === "new") {
      VisualCom.value.doneType("new");
      drawerTitle.value = "新建模型方案";
      if (ruleForm.modelList.length >= 3) {
        ElMessage({
          type: "warning",
          message: "最多可有三套模型方案",
        });
        drawer.value = false;
      }
    } else {
      console.log(flag, "什么???");
      rowIndex.value = flag.$index;
      VisualCom.value.doneType("change", flag.row);
      drawerTitle.value = flag.row.scenarioName;
    }
  });
};
const deleteRow = (flag) => {
  ruleForm.modelList.splice(flag.$index, 1);
};

const cancelClick = () => {
  drawer.value = false;
};
const confirmClick = () => {
  console.log(VisualCom.value.info, "属性???");
  console.log(VisualCom.value.scenario_name, VisualCom.value.mode_type, "上面");
  if (VisualCom.value.scenario_name === "") {
    ElMessage({
      type: "warning",
      message: "请输入模型名称",
    });
    return;
  }
  if (VisualCom.value.mode_type === "") {
    ElMessage({
      type: "warning",
      message: "请选择模型规范",
    });
    return;
  }

  let modelParam = {
    flowInfo: VisualCom.value.info,
    scenarioName: VisualCom.value.scenario_name,
    modeType: VisualCom.value.mode_type,
  };
  if (openFlag.value === "new") {
    modelParam.id = uuidv4();
    ruleForm.modelList.push(modelParam);
  } else {
    console.log(ruleForm.modelList, rowIndex.value, modelParam, "插入");
    ruleForm.modelList[rowIndex.value] = modelParam;
  }
  cancelClick();
};
onMounted(() => {
  getInfo();
  getLists();
});
</script>

<style lang="less" scoped>
h4 {
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 20px;
}

.btnList {
  margin-bottom: 20px;
}

.formBox {
  padding: 20px;
  position: relative;
  height: 100%;
  padding-bottom: 40px;

  .formItem {
    width: 300px;
  }

  .footer {
    padding-top: 10px;
    height: 40px;
    width: 100%;
    position: absolute;
    bottom: 10px;
    left: 0px;
    display: flex;
    padding-right: 20px;
    justify-content: flex-end;
  }
}
</style>
