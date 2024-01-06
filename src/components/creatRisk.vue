<template>
  <el-dialog
    v-model="riskVisible"
    title="标记风险"
    width="700px"
    :destroy-on-close="true"
  >
    <el-steps :active="stepValue">
      <el-step title="风险设置" :icon="Location" />
      <el-step title="监控设置" :icon="Tools" />
      <el-step title="审核设置" :icon="Tickets" />
    </el-steps>
    <div v-show="stepValue === 0" class="content">
      <el-form
        ref="ruleFormRef0"
        :model="ruleForm0"
        :rules="rules0"
        label-width="160px"
        class="demo-ruleForm"
        status-icon
      >
        <el-form-item label="资产名称" prop="name">
          <el-input
            v-model="ruleForm0.name"
            :disabled="true"
            class="form_item"
          />
        </el-form-item>
        <el-form-item label="风险别名" prop="riskAlias">
          <el-input v-model="ruleForm0.riskAlias" class="form_item" />
        </el-form-item>
        <el-form-item label="风险定位" prop="riskPosition">
          <el-radio-group v-model="ruleForm0.riskPosition">
            <el-radio
              v-for="(item, index) in riskOptions.riskPositionList"
              :label="item.value"
              :key="index"
              >{{ item.label }}</el-radio
            >
          </el-radio-group>
        </el-form-item>
        <el-form-item label="风险等级" prop="riskLevel">
          <el-select
            v-model="ruleForm0.riskLevel"
            placeholder="Select"
            size="large"
            class="form_item"
          >
            <el-option
              v-for="item in riskOptions.riskLevelOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <div v-show="stepValue === 1" class="content">
      <el-form
        ref="ruleFormRef1"
        :model="ruleForm1"
        :rules="rules1"
        label-width="160px"
        class="demo-ruleForm"
        status-icon
      >
        <el-form-item label="监控开关" prop="isControl">
          <el-switch
            v-model="ruleForm1.isControl"
            size="large"
            active-text="打开"
            inactive-text="关闭"
          />
        </el-form-item>
        <el-form-item
          label="监控粒度"
          prop="controlSize"
          v-if="ruleForm1.isControl"
        >
          <el-radio-group v-model="ruleForm1.controlSize">
            <el-radio
              v-for="(item, index) in riskOptions.controlSizeList"
              :label="item.value"
              :key="index"
              >{{ item.label }}</el-radio
            >
          </el-radio-group>
        </el-form-item>
        <el-form-item label="监控时间" prop="times" v-if="ruleForm1.isControl">
          <el-date-picker
            v-model="ruleForm1.times"
            type="daterange"
            start-placeholder="起始时间"
            value-format="YYYY-MM-DD"
            :disabled-date="setDisableDate"
            end-placeholder="终结时间"
          />
        </el-form-item>
      </el-form>
    </div>
    <div v-show="stepValue === 2" class="content">
      <el-form
        ref="ruleFormRef2"
        :model="ruleForm2"
        :rules="rules2"
        label-width="160px"
        class="demo-ruleForm"
        status-icon
      >
        <el-form-item label="审核人员" prop="auditUser">
          <el-select
            v-model="ruleForm2.auditUser"
            placeholder="请选择审核人员"
            size="large"
            class="form_item"
          >
            <el-option
              v-for="item in userList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="提交说明" prop="explain">
          <el-input
            v-model="ruleForm2.explain"
            :rows="2"
            type="textarea"
            placeholder="请输入提交说明"
            class="form_item"
          />
        </el-form-item>
        <el-form-item label="通知方式" prop="times" v-if="ruleForm1.times">
          <el-checkbox-group v-model="ruleForm2.inform">
            <el-checkbox
              v-for="item in informList"
              :key="item"
              :label="item"
              size="large"
              :disabled="item === 'IAM'"
            />
          </el-checkbox-group>
        </el-form-item>
      </el-form>
    </div>
    <div class="btnList">
      <el-button @click="callBack" v-if="stepValue !== 0">上一步</el-button>
      <el-button @click="next" v-if="stepValue !== 2">下一步</el-button>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="riskDiaCancel">取消</el-button>
        <el-button type="primary" @click="riskSure">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script setup>
import { envname } from "@/javascript/envname";
import store from "@/store/index.js";
import { Location, Tools, Tickets } from "@element-plus/icons-vue";
import riskOptions from "@/dictionaries/risk.json";
import request from "@/utils/requestUtils";
import { ElMessage } from "element-plus";
const emit = defineEmits(["addRiskSuccess"]);
const riskVisible = ref(false);
let stepValue = ref(0);
const ruleFormRef0 = ref(null);
const ruleFormRef1 = ref(null);
const ruleFormRef2 = ref(null);
let informList = ["手机", "微信", "OA系统", "邮箱", "IAM"];
let ruleForm0 = ref({
  name: "",
  riskAlias: "",
  riskPosition: "purchase",
  riskLevel: "normal",
});
let ruleForm1 = ref({
  isControl: true,
  controlSize: "year",
  times: [],
});
let ruleForm2 = ref({
  auditUser: null,
  explain: "",
  inform: ["IAM"],
});
let rules0 = {
  riskAlias: [
    {
      required: true,
      message: "请输入风险别名",
      trigger: "blur",
    },
    {
      min: 6,
      message: "账号至少为6位数",
      trigger: "blur",
    },
    {
      max: 12,
      message: "账号最多为12位数",
      trigger: "blur",
    },
    {
      pattern: new RegExp("^[\\u4e00-\\u9fa5][\\u4e00-\\u9fa5a-zA-Z0-9-]*$"),
      message: "只可以输入中文和数字",
      trigger: "blur",
    },
  ],
  riskPosition: [
    {
      required: true,
      message: "风险定位必须选择",
      trigger: "change",
    },
  ],
  riskLevel: [
    {
      required: true,
      message: "风险等级必须选择",
      trigger: "change",
    },
  ],
};
let rules1 = {
  controlSize: [
    {
      required: true,
      message: "监控粒度必须选择",
      trigger: "change",
    },
  ],
  times: [
    {
      required: true,
      message: "监控时间必须选择",
      trigger: "change",
    },
  ],
};
let rules2 = {
  auditUser: [
    {
      required: true,
      message: "审核负责人必须选择",
      trigger: "change",
    },
  ],
  explain: [
    {
      required: true,
      message: "审核提交说明必须填写",
      trigger: "blur",
    },
  ],
};
let userList = ref([]);
let recordInfo = ref({});
const openDialog = (record) => {
  riskVisible.value = true;
  recordInfo.value = record;
  ruleForm0.value.name =
    recordInfo.value.name || recordInfo.value[`${recordInfo.value.mode}Name`];
  console.log(recordInfo.value, "资产信息");
  request.get(`${envname.apiUrl}/app/user/userAllList`).then((res) => {
    if (res.code == 200) {
      userList.value = res.data;
    }
  });
};
const riskDiaCancel = () => {
  riskVisible.value = false;
  ruleForm0.value = {
    name: "",
    riskAlias: "",
    riskPosition: "purchase",
    riskLevel: "normal",
  };
  ruleForm1 = {
    isControl: true,
    controlSize: "year",
    times: [],
  };
  ruleForm2 = {
    auditUser: null,
    explain: "",
    inform: ["IAM"],
  };
};
const riskSure = () => {
  if (stepValue.value !== 2) {
    ElMessage({
      message: "请提交完整的信息",
      type: "warning",
    });
    return;
  }
  ruleFormRef2.value.validate((valid, fields) => {
    if (valid) {
      console.log(recordInfo.value, "本位资产信息");
      console.log(
        ruleForm0.value,
        ruleForm1.value,
        ruleForm2.value,
        "三个表单的信息"
      );
      let queryData = {};
      queryData.mode = recordInfo.value.mode;
      queryData.propertyId = recordInfo.value.uuid;
      queryData.status = "unreviewed";
      queryData.propertyName =
        recordInfo.value.name ||
        recordInfo.value[`${recordInfo.value.mode}Name`];
      queryData.propertyCnName =
        recordInfo.value.cname ||
        recordInfo.value[`${recordInfo.value.mode}CnName`];
      queryData.progress = 1;
      queryData.recordList = [];
      let doneUser = {
        name: JSON.parse(localStorage.getItem("userInfo")).name,
        userName: JSON.parse(localStorage.getItem("userInfo")).userName,
      };
      queryData.doneUser = doneUser;
      queryData = Object.assign(queryData, ruleForm0.value);
      queryData = Object.assign(queryData, ruleForm1.value);
      queryData = Object.assign(queryData, ruleForm2.value);
      console.log(queryData, "最终的提交值");
      request.post(`${envname.apiUrl}/app/risk/new`, queryData).then((res) => {
        if (res.code == 200) {
          ElMessage({
            message: "新增成功",
            type: "success",
          });
          riskDiaCancel();
          emit("addRiskSuccess");
        }
      });
      // query.type = ''
      // riskDiaCancel()
    }
  });
};
let next = () => {
  if (stepValue.value === 0) {
    ruleFormRef0.value.validate((valid, fields) => {
      if (valid) {
        if (stepValue.value++ > 1) {
          stepValue.value = 0;
        }
      }
    });
  } else if (stepValue.value === 1) {
    ruleFormRef1.value.validate((valid, fields) => {
      if (valid) {
        if (stepValue.value++ > 1) {
          stepValue.value = 0;
        }
      }
    });
  }
};
let callBack = () => {
  stepValue.value -= 1;
};
const setDisableDate = (time) => {
  return time.getTime() < Date.now();
};
defineExpose({
  openDialog,
});
onMounted(() => {
  console.log(riskOptions, "配置");
  console.log(
    store.state.user.userInfo,
    "全局变量",
    JSON.parse(localStorage.getItem("userInfo"))
  );
});
</script>
<style lang="less" scoped>
.content {
  padding: 16px;

  /deep/ .el-range-editor.el-input__wrapper {
    max-width: max-content;
  }

  .form_item {
    width: 400px;
  }
}

.btnList {
  display: flex;
  justify-content: center;
}
</style>