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
            <el-form-item :label="item.label" :prop="item.name">
              <el-input
                class="formItem"
                v-if="item.type === 'input'"
                v-model="formData[item.name]"
              ></el-input>
              <el-input
                class="formItem"
                v-if="item.type === 'textarea'"
                v-model="formData[item.name]"
                :rows="4"
                type="textarea"
              />
              <el-select
                class="formItem"
                v-else-if="item.type === 'select'"
                v-model="formData[item.name]"
              >
                <el-option
                  v-for="(m, n) in item.options"
                  :key="n"
                  :label="m.label"
                  :value="m.value"
                ></el-option>
              </el-select>
              <el-radio-group
                class="ml-4"
                v-model="formData[item.name]"
                v-else-if="item.type === 'radio'"
              >
                <el-radio
                  :label="m.label"
                  size="large"
                  v-for="(m, n) in item.options"
                  :key="n"
                  >{{ m.text }}</el-radio
                >
              </el-radio-group>
              <el-select
                class="formItem"
                v-else-if="item.type === 'multiple_select'"
                v-model="formData[item.name]"
                multiple
              >
                <el-option
                  v-for="(m, n) in item.options"
                  :key="n"
                  :label="m.label"
                  :value="m.value"
                ></el-option>
              </el-select>
              <el-upload
                v-model="formData[item.name]"
                class="formItem upload-demo"
                v-else-if="item.type === 'upload'"
                :limit="1"
              >
                <el-button type="primary">选取</el-button>
                <el-button type="primary">上传</el-button>
              </el-upload>
              <el-date-picker
                class="formItem"
                v-else-if="item.type === 'time'"
                v-model="formData[item.name]"
                type="date"
                size="default"
              />
              <el-icon size="20px" class="iconBox"><QuestionFilled /></el-icon>
            </el-form-item>
          </el-col>
        </el-row>
      </template>
    </el-form>
    <div class="footer">
      <el-button type="primary"> 创建 </el-button>
      <el-button>返回</el-button>
    </div>
  </div>
</template>
<script setup>
import { useRouter, useRoute } from "vue-router";
import request from "@/utils/requestUtils";
import { onMounted, reactive } from "vue";
const router = useRouter();
const route = useRoute();
let templateList = ref([]);
let formData = reactive({});
let rules = ref([]);
const reqTemplate = () => {
  request.post("/app/publicForm/template", { type: "entiry" }).then((res) => {
    console.log(res, "请求的结果");
    templateList.value = res.data;
    templateList.value.forEach((item) => {
      item.formList.forEach((val) => {
        formData[val.name] = val.default;
      });
    });
    console.log(formData, "依赖值??");
  });
};

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
  /deep/ .el-form-item__content {
    display: flex;
    flex-wrap: nowrap;
  }
  .iconBox {
    margin-left: 20px;
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