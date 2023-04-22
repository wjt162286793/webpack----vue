<template>
  <div class="box">
    <div class="content">
      <img src="@/assets/loginBack.jpg" class="img" alt="" />
      <div class="loginForm">
        <p class="title">欢迎登录</p>
        <el-form
          ref="ruleFormRef"
          :model="ruleForm"
          :rules="rules"
          label-width="120px"
          class="demo-ruleForm"
          :size="formSize"
          status-icon
        >
          <el-form-item prop="name">
            <el-input
              v-model="ruleForm.name"
              placeholder="请输入账号"
              clearable
            />
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model="ruleForm.password"
              placeholder="请输入密码"
              type="password"
              show-password
              clearable
            />
          </el-form-item>
          <el-form-item>
            <div class="footer">
              <el-button type="primary" @click="submitForm()" class="btn">
                登录
              </el-button>
              <el-button
                type="primary"
                @click="dialogOpen('register')"
                class="btn"
              >
                注册
              </el-button>
              <el-button @click="dialogOpen('change')" class="btn">
                修改密码
              </el-button>
              <el-checkbox
                style="margin-left: 15px"
                v-model="autoLogin"
                label="自动登录"
                @change="changeCheck"
                size="large"
              />
            </div>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <el-dialog v-model="dialogFormVisible" :title="dialogTitle" width="550">
      <el-form :model="form" ref="dialogForm" :rules="dialogRules">
        <el-form-item label="账号" :label-width="formLabelWidth" prop="name">
          <el-input v-model="form.name" autocomplete="off" clearable />
        </el-form-item>
        <el-form-item
          :label="firstPassword"
          :label-width="formLabelWidth"
          prop="password"
        >
          <el-input
            v-model="form.password"
            autocomplete="off"
            type="password"
            show-password
            clearable
          />
        </el-form-item>
        <el-form-item
          :label="secondPassword"
          :label-width="formLabelWidth"
          prop="verifyPassword"
        >
          <el-input
            v-model="form.verifyPassword"
            autocomplete="off"
            type="password"
            show-password
            clearable
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="closeDialog">取消</el-button>
          <el-button type="primary" @click="done" style="margin-right: 40px">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      formSize: "default",
      ruleForm: {
        name: "",
        password: "",
      },
      rules: {
        name: [
          { required: true, message: "请输入账号", trigger: "blur" },
          { min: 6, message: "账号至少为6位数", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, message: "密码至少为6位数", trigger: "blur" },
        ],
      },
      dialogRules: {
        name: [
          { required: true, message: "请输入账号", trigger: "blur" },
          { min: 6, message: "账号至少为6位数", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, message: "密码至少为6位数", trigger: "blur" },
        ],
        verifyPassword: [
          { required: true, message: "请再次输入密码", trigger: "blur" },
          { min: 6, message: "密码至少为6位数", trigger: "blur" },
        ],
      },
      dialogTitle: "注册用户",
      dialogFormVisible: false,
      formLabelWidth: "240px",
      firstPassword: "",
      secondPassword: "",
      doneFlag: "register",
      form: {
        name: "",
        password: "",
        verifyPassword: "",
      },
      autoLogin: false,
    };
  },
  created() {
    if (localStorage.getItem("autoLogin")) {
      if (localStorage.getItem("autoLogin") == "true") {
        this.changeCheck(true);
      } else if (localStorage.getItem("autoLogin") == "false") {
        this.changeCheck(false);
      }
    } else {
      localStorage.setItem("autoLogin", this.autoLogin);
    }
  },
  methods: {
    //登录
    submitForm() {
      this.$refs.ruleFormRef.validate((valid, fields) => {
        if (valid) {
          console.log(this.ruleForm, "登录信息");
          this.$axios.post("app/user/login", this.ruleForm).then((res) => {
            console.log(res, "登录返回结果");
            if (res.code === 200) {
              localStorage.setItem("token", res.data.token);
              this.$store.dispatch("changeUserInfo", res.data);
              this.$router.push({
                path: "/dashboard",
              });
            } else if (res.code === 201) {
              this.$message.error(res.message);
            }
          });
        } else {
          console.log("error submit!", fields);
        }
      });
    },
    //注册 or 修改密码
    done() {
      let url = "";
      if (this.doneFlag === "register") {
        url = `/app/register/query`;
      } else if (this.doneFlag === "change") {
        url = `/app/user/updatePassword`;
      }
      this.$refs.dialogForm.validate((valid, fields) => {
        if (valid) {
          if (this.form.password !== this.form.verifyPassword) {
            this.$message.warning("密码和确认密码不一致,请重新输入");
            return;
          }
          let queryData = {
            name: this.form.name,
            password: this.form.password,
          };
          this.$axios.post(url, queryData).then((res) => {
            if (res.code === 200) {
              this.$message.success(res.message);
              this.closeDialog();
            } else if (res.code === 201) {
              this.$message.error(res.message);
            }
          });
        } else {
          console.log("error submit!", fields);
        }
      });
    },
    //关闭弹框
    closeDialog() {
      this.dialogFormVisible = false;
      this.form = { name: "", password: "", verifyPassword: "" };
    },
    //退出登录
    logOut() {
      localStorage.removeItem("token");
      console.log(localStorage.getItem("token"), "token值");
    },
    //打开弹框
    dialogOpen(flag) {
      this.dialogFormVisible = true;
      this.doneFlag = flag;
      if (flag === "register") {
        this.dialogTitle = "注册用户";
        this.firstPassword = "密码";
        this.secondPassword = "确认密码";
      } else {
        this.dialogTitle = "修改密码";
        this.firstPassword = "新密码";
        this.secondPassword = "确认密码";
      }
    },
    //修改自动登录
    changeCheck(val) {
      this.autoLogin = val;
      console.log(this.autoLogin, "自动登录标识");
      localStorage.setItem("autoLogin", this.autoLogin);
    },
  },
};
</script>

<style lang="less" scoped>
.box {
  background-image: linear-gradient(#f1f0f0, #fff);
  position: relative;
  .content {
    .img {
      width: 100vw;
      height: 100vh;
    }
    .title {
      margin: 10px 0 40px;
      text-align: center;
      color: var(--text-color3);
      font-size: 18px;
    }
    .loginForm {
      position: absolute;
      right: 30px;
      top: 200px;
      width: 400px;
      height: 300px;
      background: #fff;
      .footer {
        // padding-left: 50px;
        .btn {
        }
      }
    }
  }
  /deep/ .el-form-item__content {
    margin-left: 40px !important;
  }
  /deep/ .el-input {
    width: 330px !important;
  }
}
/deep/ .el-form-item__label {
  width: 100px !important;
}
</style>
