<template>
  <div class="formBox">
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
              <el-option label="王惊涛" value="wjt" />
              <el-option label="马师" value="ms" />
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
      <div class="footer">
        <el-button type="primary" @click="submitForm(ruleFormRef)">
          提交
        </el-button>
        <el-button @click="goBack">返回</el-button>
      </div>
    </el-form>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import request from "@/utils/requestUtils";
import { ElMessage } from "element-plus";
let ruleForm = reactive({
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

const submitForm = (formEl) => {
  if (!formEl) return;
  formEl.validate((valid, fields) => {
    if (valid) {
      console.log(ruleForm, "结果");
      request.post("/app/business/change", ruleForm).then((res) => {
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

const getInfo = () => {
  request.post("/app/business/Info", { id: route.query.id }).then((res) => {
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
    }
  });
};
getInfo();
</script>

<style lang="less" scoped>
.formBox {
  padding: 20px;
  position: relative;
  height: 100%;
  padding-bottom: 40px;
  .formItem {
    width: 300px;
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
</style>
