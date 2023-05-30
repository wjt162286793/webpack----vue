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
              <el-option label="王惊涛" value="王惊涛" />
              <el-option label="马师" value="马师" />
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
              <el-option label="金融资产" value="1" />
              <el-option label="不动产" value="2" />
              <el-option label="移动资产" value="3" />
              <el-option label="知识产权" value="4" />
              <el-option label="文艺资产" value="5" />
              <el-option label="公共基础设施" value="6" />
              <el-option
                label="自然资源"
                value="7"
              /> </el-select></el-form-item
        ></el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="关联实体" prop="entiry">
            <el-select
              v-model="ruleForm.entiry"
              placeholder="请选择资产负责人"
              class="formItem"
              clearable
            >
              <el-option label="长城汽车" value="1" />
              <el-option label="富士康" value="2" />
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
    </el-form>
    <h4>模型图</h4>
    <div class="btnList">
    <el-button type="primary" @click="openDrawer('new')">创建模型图方案</el-button>
    <el-button type="danger">删除模型图方案</el-button>
    </div>
    <el-table
    ref="multipleTableRef"
    :data="tableData"
    style="width: 100%"
    @selection-change="handleSelectionChange"
  >
    <el-table-column type="selection" width="55" />
    <el-table-column label="Date" width="120">
      <template #default="scope">{{ scope.row.date }}</template>
    </el-table-column>
    <el-table-column property="name" label="Name" width="120" />
    <el-table-column property="address" label="Address" show-overflow-tooltip />
  </el-table>
  <div class="footer">
        <el-button type="primary" @click="submitForm(ruleFormRef)">
          创建
        </el-button>
        <el-button @click="goBack">返回</el-button>
      </div>
  </div>
  <el-drawer v-model="drawer" direction="rtl" size="85%" destroy-on-close>
    <template #header>
      <h4 style="margin-bottom: 0px;">{{drawerTitle}}</h4>
    </template>
    <template #default>
      <div class="nameContent">
        方案名称:<el-input v-model="scenario_name" style="width:400px;margin-left: 30px;"></el-input>
      </div>
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
import { useRouter, useRoute } from "vue-router";
import request from "@/utils/requestUtils";
import { ElMessage } from "element-plus";
import Visual from './visual.vue'
const ruleForm = reactive({
  name: "",
  cname: "",
  user: "",
  region: null,
  entiry: null,
  dcs: "",
  type: null,
  status: 1,
});
const route = useRoute();
const router = useRouter();
const ruleFormRef = ref(null);
let VisualCom = ref(null)
let drawerTitle = ref('新建模型方案')
let scenario_name = ref('')
let attr = useAttrs()
let drawer = ref(false)


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
]

const handleSelectionChange = (val) => {
  multipleSelection.value = val
}
const multipleSelection = ref([])

const submitForm = (formEl) => {
  if (!formEl) return;
  formEl.validate((valid, fields) => {
    if (valid) {
      // console.log(ruleForm, "结果");
      request.post("app/business/new", ruleForm).then((res) => {
        if (res.code === 200) {
          ElMessage({
            message: "新建成功",
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

const options = Array.from({ length: 10000 }).map((_, idx) => ({
  value: `${idx + 1}`,
  label: `${idx + 1}`,
}));
const openDrawer = (flag)=>{
  
  drawer.value = true
}
const cancelClick = ()=>{
  drawer.value = false
}
const confirmClick  = ()=>{
console.log(VisualCom.value.plumbList,'属性???')
}
</script>

<style lang="less" scoped>
h4{
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 20px;
}
.formBox {
  padding: 20px;
  position: relative;
  overflow: auto;
  height: 100%;
  padding-bottom: 40px;
  .formItem {
    width: 300px;
  }
  .btnList{
    margin-bottom: 20px;
  }
  .footer {
    height: 40px;
    width: 100%;
    position: absolute;
    bottom: 0px;
    left: 0px;
    display: flex;
    padding-right: 20px;
    justify-content: flex-end;
  }
}
.nameContent{
  padding-bottom: 14px;
  border-bottom: 1px solid #eee;
}
</style>
