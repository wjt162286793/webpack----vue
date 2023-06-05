<template>
  <el-form
  v-if="infoType === 'node'"
    ref="ruleFormRef"
    :model="ruleForm"
    :rules="rules"
    label-width="120px"
    class="demo-ruleForm"
    :size="formSize"
    status-icon
    label-position="left"
  >
    <el-form-item
      :label="item.label"
      :prop="item.name"
      v-for="(item, index) in formData"
      :key="index"
    >
      <el-input v-model="ruleForm[item.name]" v-if="item.type === 'text'" />
      <el-input
        v-model="ruleForm[item.name]"
        type="textarea"
        v-else-if="item.type === 'textarea'"
      />
      <el-select v-model="ruleForm[item.name]" v-else-if="item.type === 'select'">
        <el-option
          :label="m.label"
          :value="m.value"
          v-for="(m, n) in item.options"
          :key="n"
        />
      </el-select>
    </el-form-item>
  </el-form>
  <div v-if="infoType === 'line'">
    <h6>起始节点:</h6>
    <p>{{ lineData.sourceInfo.config[0].value }}</p>
    <h6>目标节点:</h6>
    <p>{{ lineData.targetInfo.config[0].value }}</p>
  </div>
  <div class="btnBox" v-show="listShow">
    <el-button type="primary" @click="submitForm(ruleFormRef)" v-show="infoType === 'node'">
        保存节点
    </el-button>
    <el-button type="primary" v-show="infoType === 'node'" @click="delteNodeFun">
        删除节点
    </el-button>
    <el-button type="primary" v-show="infoType === 'line'" @click="deleteLineFun">
        删除连线
    </el-button>
  </div>
</template>
<script setup>
let formData = ref([]);
let lineData = ref({})
const formSize = ref("default");
const ruleFormRef = ref();
const listShow = ref(false)
let ruleForm = reactive({});
const infoType = ref('node')
const emit = defineEmits(['changeActiveNodeInfo','deleteLine'])
const rules = reactive({
  label: [
    { required: true, message: "节点名称为必输项", trigger: "blur" },
    { min: 4, max: 8, message: "请输入4至8之间的字符", trigger: "blur" },
  ],
  affiliation: [
    {
      required: true,
      message: "请选择归属项",
      trigger: "change",
    },
  ],
});
const submitForm = async (formEl) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log(valid,ruleForm);
      formData.value.forEach(item=>{
      item.value = ruleForm[item.name]
      })
      emit('changeActiveNodeInfo',formData.value)
    } else {
      console.log("error submit!", fields);
    }
  });
};

const resetForm = (formEl) => {
  if (!formEl) return;
  formEl.resetFields();
};

const options = Array.from({ length: 10000 }).map((_, idx) => ({
  value: `${idx + 1}`,
  label: `${idx + 1}`,
}));
const getFormData = () => {
  console.log(formData, "信息");
};
//父节点传递信息函数
const changeFormData = (val) => {
  infoType.value = 'node'
  listShow.value = true 
  console.log(val);
  formData.value = val;
  formData.value.forEach(item=>{
    console.log(item,'遍历')
    ruleForm[item.name] = item.value
  })
  console.log(ruleForm,'???')
};
//父节点传递连线信息
const getLineInfo = (lineInfo)=>{
  listShow.value = true 
console.log(lineInfo,'连线信息')
infoType.value = 'line'
lineData.value = lineInfo
}
//删除连线信息
const deleteLineFun = ()=>{
 emit('deleteLine',lineData.value)
 infoType.value = null
}
//删除节点
const delteNodeFun = ()=>{
  emit('deleteNode',formData.value)
}
onMounted(() => {});
defineExpose({
  changeFormData,
  getLineInfo,
  formData,
});
</script>
<style lang="less" scoped>
/deep/ .el-form-item {
  display: flex;
  flex-direction: column !important;
}
h6{
  font-size: 14px;
  font-weight: 500;
  margin:5px;
  overflow: hidden;
}
p{
  margin:20px;
  border-bottom: 1px solid #eee;
  overflow: hidden;
} 
</style>