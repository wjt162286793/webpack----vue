<template>
  <div class="layout">
    <!-- <el-button type="primary" @click="createVueFile">创建vue文件</el-button> -->
    <div class="layoutHeader">
      <h1>资产管理系统</h1>
      <div class="headerMenu">
        <img
          :src="require(`@/assets/svg/${item.name}.svg`)"
          :alt="item.name"
          v-for="(item, index) in headerMenuList"
          :key="index"
          class="headerImg"
          @click="Iconto(item.value)"
        />
      </div>
    </div>
    <div class="layoutBody">
      <el-menu
        :default-active="menuActive"
        :collapse="isCollapse"
        active-text-color="#ffd04b"
        background-color="#545c64"
        class="el-menu-vertical-demo"
        text-color="#fff"
        @open="handleOpen"
        @close="handleClose"
        @select="handleMenuSelect"
        :router="true"
      >
        <el-menu-item
          v-for="(item, index) in leftMenuList"
          :key="index"
          :index="item.name"
          @click="jumpMode(item.name)"
        >
          <!-- <el-icon></el-icon> -->
          <img
            :src="require(`@/assets/svg/${item.meta.name}.svg`)"
            alt=""
            class="leftMenuImg"
          />
          <span>{{ item.meta.name }}</span>
        </el-menu-item>
      </el-menu>
      <div class="content">
        <el-breadcrumb separator="/" class="breadCrumb">
          <template v-for="(item, index) in breadList" :key="index">
            <el-breadcrumb-item
              @click="breadJump(item.name)"
              v-if="item.name !== 'dashboard'"
              ><span>{{ item.cname }}</span></el-breadcrumb-item
            >
            <el-breadcrumb-item @click="breadJump(item.name)" v-else
              ><span>{{ item.cname }}</span></el-breadcrumb-item
            >
          </template>
        </el-breadcrumb>
        <div class="modeBox">
          <router-view></router-view>
        </div>
      </div>
    </div>
    <img src="@/assets/svg/菜单.svg" alt="" @click="unfold" class="menuIcon" />
  </div>
</template>

<script setup>
import {
  ref,
  reactive,
  onMounted,
  watch,
  getCurrentInstance,
  queuePostFlushCb,
} from "vue";
import { useRouter, useRoute } from "vue-router";
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from "@element-plus/icons-vue";
const interInstance = getCurrentInstance();
let menuActive = ref("dashboard");
//全量路由
let router = useRouter();
//当前路由
let route = useRoute();
//面包屑列表
let breadList = reactive([
  {
    cname: "主页",
    name: "dashboard",
  },
]);
//计算面包屑列表
const getBreadList = (routePath, allRouters) => {
  breadList.splice(0, breadList.length);
  let pathList = routePath.split("/");
  console.log(pathList, "路由路径");
  pathList.shift();
  pathList.forEach((item, index) => {
    if (item === "dashboard") {
      breadList.push({ cname: "主页", name: "dashboard" });
    } else {
      let val = allRouters.find((v) => v.name === item);
      if (val) {
        breadList.push({
          cname: val.meta.name,
          name: val.name,
        });
        console.log(val, "1层值");
        if (val.children) {
          let m = val.children.find((v) => v.name === pathList[index + 1]);
          if (m) {
            breadList.push({
              cname: m.meta.name,
              name: m.name,
            });
          }
        }
      }
    }
  });
  console.log(breadList, "面包屑列表");
};
const leftMenuList = router.options.routes.find(
  (item) => item.name === "dashboard"
).children;
//左侧菜单伸展
const isCollapse = ref(false);
//顶部菜单
const headerMenuList = reactive([
  {
    name: "邮件",
    value: "email",
  },
  {
    name: "主题色",
    value: "color",
  },
  {
    name: "github",
    value: "github",
  },
  {
    name: "用户",
    value: "user",
  },
  {
    name: "退出",
    value: "out",
  },
]);
const handleOpen = (key, keyPath) => {
  console.log(key, keyPath);
};
const handleClose = (key, keyPath) => {
  console.log(key, keyPath);
};
const unfold = () => {
  isCollapse.value = !isCollapse.value;
};
const jump = (val) => {
  router.push({ name: val });
  // getBreadList(route.path, router.options.routes[3].children);
};
const outLogin = (val) => {
  localStorage.removeItem("token");
  router.push({ path: "/login" });
};
const Iconto = (val) => {
  switch (val) {
    case "github":
      window.open("https://github.com/wjt162286793/webpack----vue");
      break;
    case "out":
      outLogin();
      break;
  }
};
const breadJump = (breadName) => {
  if (breadName === "dashboard") {
    return;
  }
  if (breadName === route.name) {
    return;
  } else {
    router.push({ name: breadName });
  }
};
const handleMenuSelect = (menuVal) => {
  menuActive.value = menuVal;
};
const jumpMode = (name) => {
  router.push({ name: name });
};
// export default {
//   name: "dashboard",
//   created() {
//     console.log(this.$store.state.user.userInfo, "vuex");
//     this.userInfo = this.$store.state.user.userInfo;
//   },
//   methods: {
//     createVueFile() {
//       this.$axios.get("app/user/createVue").then((res) => {
//         console.log(res);
//       });
//     },
//   },
// };
onMounted(() => {
  console.log(route.name, "目前路由");
  if (route.path === "/dashboard") {
    router.push({ path: "/dashboard/business" });
    menuActive.value = "business";
  } else {
    menuActive.value = route.name;
  }
  getBreadList(route.path, router.options.routes[3].children);
  watch(
    () => route.fullPath,
    (newVal, oldVal) => {
      getBreadList(newVal, router.options.routes[3].children);
      if (newVal === "/dashboard") {
        router.push({ path: "/dashboard/business" });
        menuActive.value = "business";
      }
    }
  );
});
</script>

<style lang="less" scoped>
.layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
  position: relative;
  .layoutHeader {
    color: var(--text-color1);
    background: var(--background-color1);
    box-sizing: border-box;
    border-bottom: var(--border-color2) 1px solid;
    height: 100px;
    display: flex;
    // background: chartreuse;
    h1 {
      width: 200px;
      height: 100px;
      line-height: 100px;
      text-align: center;
      color: var(--text-color3);
      background: var(--backround-color5);
    }
    .headerMenu {
      flex: 1;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      position: relative;
      .headerImg {
        margin: 0px 15px;
        width: 30px;
        height: 30px;
        cursor: pointer;
      }
    }
  }
  .layoutBody {
    display: flex;
    flex-grow: 1;
    // .leftMenu {
    //   // width: 200px; /* 设置左侧边栏宽度 */
    //   transition: width 0.2s;
    //   background-color: var(--backround-color6);
    //   position: relative;
    //   .LeftBtn {
    //     position: absolute;
    //     bottom: 10px;
    //     right: 10px;
    //   }
    // }
    .content {
      overflow: auto;
      flex-grow: 1; /* 右侧内容区自适应宽度 */
      padding: 20px;
      padding-top: 60px;
      position: relative;
      background: var(--background-color3);
      .breadCrumb {
        position: absolute;
        top: 20px;
        left: 20px;
        span {
          cursor: pointer;
        }
        // /deep/ .el-breadcrumb__inner {
        //   color: #fff !important;
        // }
        // /deep/ .el-breadcrumb__separator {
        //   color: #fff !important;
        // }
      }
    }
  }
}
// .el-menu {
//   position: relative;
// }
.el-menu-vertical-demo:not(.el-menu--collapse) {
  min-width: 200px;
  width: 200px !important;
  min-height: 400px;
}
/deep/ .el-menu {
  border-right: none !important;
}
.menuIcon {
  position: absolute;
  left: 25px;
  bottom: 20px;
  cursor: pointer;
}
.leftMenuImg {
  width: 20px;
  height: 20px;
  cursor: pointer;
  margin-right: 20px;
}
</style>
