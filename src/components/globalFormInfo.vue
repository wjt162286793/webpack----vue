<template>
  <div class="mainBox">
    <el-form
      ref="ruleFormRef"
      :model="formData"
      :rules="rules"
      label-width="120px"
      class="demo-ruleForm"
      status-icon
    >
      <template v-for="(Item, Index) in templateList" :key="Index">
        <h4>{{ Item.title }}</h4>
        <el-row class="tem">
          <el-col
            :span="12"
            v-for="(item, index) in Item.formList"
            :key="index"
            style="margin: 10px 0"
          >
            <template></template>
            <el-form-item
              v-if="item.type === 'input'"
              :label="item.label"
              :prop="item.name"
            >
              <el-input
                class="formItem"
                v-model="formData[item.name]"
                clearable
                :disabled="disabledFun(item.editDisabled)"
              ></el-input>
              <el-tooltip
                v-if="item.remark"
                class="box-item"
                effect="dark"
                :content="item.remark"
                placement="top"
              >
                <el-icon size="20px" class="iconBox">
                  <QuestionFilled />
                </el-icon>
              </el-tooltip>
            </el-form-item>
            <el-form-item
              v-else-if="item.type === 'textarea'"
              :label="item.label"
              :prop="item.name"
            >
              <el-input
                class="formItem"
                v-model="formData[item.name]"
                :rows="4"
                type="textarea"
                clearable
                :disabled="disabledFun(item.editDisabled)"
              />
              <el-tooltip
                v-if="item.remark"
                class="box-item"
                effect="dark"
                :content="item.remark"
                placement="top"
              >
                <el-icon size="20px" class="iconBox">
                  <QuestionFilled />
                </el-icon>
              </el-tooltip>
            </el-form-item>
            <el-form-item
              v-else-if="item.type === 'select'"
              :label="item.label"
              :prop="item.name"
            >
              <el-select
                class="formItem"
                v-model="formData[item.name]"
                clearable
                :disabled="disabledFun(item.editDisabled)"
              >
                <el-option
                  v-for="(m, n) in item.options"
                  :key="n"
                  :label="m.label"
                  :value="m.value"
                ></el-option>
              </el-select>
              <el-tooltip
                v-if="item.remark"
                class="box-item"
                effect="dark"
                :content="item.remark"
                placement="top"
              >
                <el-icon size="20px" class="iconBox">
                  <QuestionFilled />
                </el-icon>
              </el-tooltip>
            </el-form-item>
            <el-form-item
              v-else-if="item.type === 'radio'"
              :label="item.label"
              :prop="item.name"
            >
              <el-radio-group
                class="ml-4"
                v-model="formData[item.name]"
                :disabled="disabledFun(item.editDisabled)"
              >
                <el-radio
                  :label="m.label"
                  size="large"
                  v-for="(m, n) in item.options"
                  :key="n"
                  >{{ m.text }}</el-radio
                >
              </el-radio-group>
              <el-tooltip
                v-if="item.remark"
                class="box-item"
                effect="dark"
                :content="item.remark"
                placement="top"
              >
                <el-icon size="20px" class="iconBox">
                  <QuestionFilled />
                </el-icon>
              </el-tooltip>
            </el-form-item>
            <el-form-item
              v-else-if="item.type === 'multiple_select'"
              :label="item.label"
              :prop="item.name"
            >
              <el-select
                class="formItem"
                v-model="formData[item.name]"
                multiple
                clearable
                :disabled="disabledFun(item.editDisabled)"
              >
                <el-option
                  v-for="(m, n) in item.options"
                  :key="n"
                  :label="m.label"
                  :value="m.value"
                ></el-option>
              </el-select>
              <el-tooltip
                v-if="item.remark"
                class="box-item"
                effect="dark"
                :content="item.remark"
                placement="top"
              >
                <el-icon size="20px" class="iconBox">
                  <QuestionFilled />
                </el-icon>
              </el-tooltip>
            </el-form-item>
            <el-form-item
              v-else-if="item.type === 'upload'"
              :label="item.label"
              :prop="item.name"
            >
              <el-upload
                v-model="formData[item.name]"
                class="formItem upload-demo"
                :http-request="requestFile"
                :limit="1"
                :disabled="disabledFun(item.editDisabled)"
              >
                <el-button type="primary">上传文件</el-button>
                <template #tip>
                  <div>文件地址:&nbsp;&nbsp;{{ formData["upload"] }}</div>
                </template>
              </el-upload>
              <el-tooltip
                v-if="item.remark"
                class="box-item"
                effect="dark"
                :content="item.remark"
                placement="top"
              >
                <el-icon size="20px" class="iconBox">
                  <QuestionFilled />
                </el-icon>
              </el-tooltip>
            </el-form-item>
            <el-form-item
              v-else-if="item.type === 'date'"
              :label="item.label"
              :prop="item.name"
            >
              <div class="timeBox">
                <el-date-picker
                  class="formItem"
                  v-model="formData[item.name]"
                  type="date"
                  :disabled-date="setDisableDate"
                  size="default"
                  value-format="YYYY-MM-DD"
                  clearable
                  :disabled="disabledFun(item.editDisabled)"
                />
              </div>
              <el-tooltip
                v-if="item.remark"
                class="box-item"
                effect="dark"
                :content="item.remark"
                placement="top"
              >
                <el-icon size="20px" class="iconBox">
                  <QuestionFilled />
                </el-icon>
              </el-tooltip>
            </el-form-item>
            <el-form-item
              v-else-if="item.type === 'timeRange'"
              :label="item.label"
              :prop="item.name"
            >
              <div class="timeBox">
                <el-date-picker
                  class="formItem"
                  v-model="formData[item.name]"
                  type="daterange"
                  :disabled-date="setDisableDate"
                  size="default"
                  range-separator="至"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                  :disabled="disabledFun(item.editDisabled)"
                  value-format="YYYY-MM-DD"
                />
              </div>
              <el-tooltip
                v-if="item.remark"
                class="box-item"
                effect="dark"
                :content="item.remark"
                placement="top"
              >
                <el-icon size="20px" class="iconBox">
                  <QuestionFilled />
                </el-icon>
              </el-tooltip>
            </el-form-item>
            <el-form-item v-else-if="item.type === 'flowChart'" :label="item.label">
               <el-button @click="openFlowChart" type="primary">打开画布</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </template>
    </el-form>
    <div class="footer">
      <el-button
        type="primary"
        @click="add(ruleFormRef)"
        v-if="route.query.type === 'new'"
      >
        创建
      </el-button>
      <el-button
        type="primary"
        @click="edit(ruleFormRef)"
        v-if="route.query.type === 'edit'"
      >
        保存
      </el-button>
      <el-button @click="jumpToList">返回</el-button>
    </div>
  </div>
  <el-dialog
    v-model="dialogFlowChart"
    title="价值流程图"
    width="80%"
    :before-close="handleClose"
  >
    <GlobalFlow ref="globalFlow"></GlobalFlow>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFlowChart = false">取消</el-button>
        <el-button type="primary" @click="dialogFlowChart = false">
          保存
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script setup>
import { useRouter, useRoute } from "vue-router";
import request from "@/utils/requestUtils";
import { onMounted, reactive } from "vue";
import { ElMessage } from "element-plus";
import GlobalFlow from "@/components/globalFlow.vue";
const router = useRouter();
const route = useRoute();
let templateList = ref([]);
let formData = reactive({});
let rules = reactive({});
let fileList = ref([]);
let ruleFormRef = ref(null);
let dialogFlowChart = ref(false)
let globalFlow = ref(null)
const reqTemplate = () => {
  request
    .post("/app/publicForm/template", { type: route.query.mode })
    .then((res) => {
      if (res.code === 200) {
        templateList.value = res.data;
        //组织数据
        templateList.value.forEach((item) => {
          item.formList.forEach((val) => {
            if (val.optionsSource && val.optionsSource === "request") {
              requestOPtions(val);
            }
            //表单数据汇总
            formData[val.name] = val.default;
            if (val.rule) {
              let index = val.rule.findIndex((z) => z.pattern);
              //匹配正则
              if (index !== -1) {
                val.rule[index].pattern = new RegExp(val.rule[index].pattern);
              }
              //表单权限汇总
              rules[val.name] = val.rule;
            }
          });
        });
        console.log(route.query.uuid, "uuid的值");
        if (route.query.type !== "new") {
          console.log("进来了???");
          reqFormData();
        }
      } else {
        ElMessage({
          message: res.message,
          type: "warning",
        });
      }
    });
};
const reqFormData = () => {
  let query = {
    uuid: route.query.uuid,
    mode: route.query.mode,
  };
  request.post("/app/publicApi/detail", query).then((res) => {
    if (res.code === 200) {
      for (let val in res.data) {
        formData[val] = res.data[val];
      }
    }
  });
};
const setDisableDate = (time) => {
  return time.getTime() < Date.now();
};

const requestOPtions = (item) => {
  if (item.requestMethod === "get") {
    request.get(`/app${item.requestName}`).then((res) => {
      if (res.code === 200) {
        item.options = res.data;
      } else {
        ElMessage({
          message: res.message,
          type: "warning",
        });
      }
    });
  } else {
    console.log(item, "???---探索");
    request.post(`/app${item.requestName}`, item.query).then((res) => {
      if (res.code === 200) {
        res.data.forEach((v) => {
          console.log(v);
          item.options.push({
            label: v[`${item.query["mode"]}CnName`],
            value: v.uuid,
          });
        });
      } else {
        ElMessage({
          message: res.message,
          type: "warning",
        });
      }
    });
  }
};
const requestFile = (a, b) => {
  console.log(a, b, "自上传文件");
  formData["upload"] = "youtube.com";
};
const add = (ruleFormRef) => {
  formData.mode = route.query.mode;
  if (!ruleFormRef) return;
  ruleFormRef.validate((valid, fields) => {
    if (valid) {
      request.post("/app/publicApi/add", formData).then((res) => {
        if (res.code === 200) {
          ElMessage({
            message: res.message,
            type: "success",
          });
          jumpToList();
        } else {
          ElMessage({
            message: res.message,
            type: "warning",
          });
        }
      });
    } else {
    }
  });
};
const edit = (ruleFormRef) => {
  formData.mode = route.query.mode;
  if (!ruleFormRef) return;
  ruleFormRef.validate((valid, fields) => {
    if (valid) {
      request.post("/app/publicApi/edit", formData).then((res) => {
        if (res.code === 200) {
          ElMessage({
            message: res.message,
            type: "success",
          });
          jumpToList();
        } else {
          ElMessage({
            message: res.message,
            type: "warning",
          });
        }
      });
    } else {
    }
  });
};
const jumpToList = () => {
  let list = route.path.split("/");
  list.pop();
  list.push(`${list[list.length - 1]}List`);
  let path = list.join("/");
  router.push({
    path,
  });
};
const disabledFun = (flag) => {
  if (
    route.query.type === "detail" ||
    (route.query.type !== "new" && flag === true)
  ) {
    return true;
  } else {
    return false;
  }
};
const openFlowChart = ()=>{
dialogFlowChart.value = true
}
const handleClose = ()=>{
  dialogFlowChart.value = false
}
onMounted(() => {
  reqTemplate();
});
</script>
<style lang="less" scoped>
.mainBox {
  height: 100%;
  padding: 10px;
  padding-bottom: 50px;
  position: relative;

  .tem {
    border-bottom: 1px solid #eee;
    margin-bottom: 20px;
  }

  h4 {
    font-size: 18px;
    font-weight: 500;
  }

  .formItem {
    width: 480px;
    // margin: 20px;
    // display: flex;
  }
  .timeBox {
    width: 480px;
    display: flex;
  }

  /deep/ .el-form-item__content {
    display: flex;
    flex-wrap: nowrap;
  }

  .iconBox {
    margin-left: 20px;
    cursor: pointer;
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