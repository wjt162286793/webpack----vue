<template>
  <div class="box">
    <div class="brochureHeader">
      <div class="logo">
        <img src="@/assets/Logo.png" alt="" />
      </div>
      <ul class="headerTitle">
        <li>业务领域</li>
        <li>价值流</li>
        <li>任务管理</li>
        <li>实体领域</li>
        <li>风险资产</li>
      </ul>
      <div class="jumpLogin" @click="jumpLogin">开始体验</div>
    </div>
    <div class="content">
      <div class="imgSwiper">
        <el-carousel indicator-position="outside">
          <el-carousel-item>
            <img src="../../assets/swiper1.png" alt="" />
          </el-carousel-item>
          <el-carousel-item>
            <img src="../../assets/swiper2.png" alt="" />
          </el-carousel-item>
          <el-carousel-item>
            <img src="../../assets/swiper3.png" alt="" />
          </el-carousel-item>
          <el-carousel-item>
            <img src="../../assets/swiper4.png" alt="" />
          </el-carousel-item>
          <el-carousel-item>
            <img src="../../assets/swiper5.png" alt="" />
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="introduce">
        <div class="contentLeft">
          <h2 style="font-size: 50px; font-weight: 700">IAM架构资产管理系统</h2>
          <p class="text">帮助企业对其IT架构资产进行全面管理和控制。</p>
          <p class="text">
            通过对资产的全面了解，可以更好地评估IT资本价值和成本效益，
          </p>
          <p class="text">并确保其IT环境符合法规和行业标准。</p>
          <p class="text">降低运营成本,也可提高安全性和可靠性</p>
          <p class="text">帮助企业制定和实施关键决策,更好地管理其IT资产,</p>
          <p class="text">为企业的持续发展提供坚实的基础。</p>
        </div>
        <div class="contentRight">
          <img src="@/assets/img2.png" alt="" />
        </div>
        <div class="activeImg">
          <img src="@/assets/img.gif" alt="" />
        </div>
        <div class="activeRight">
          <p class="text">员工自主查看与管理资产状态</p>
          <p class="text">对所负责资产进行直接管理</p>
          <p class="text">各层级员工拥有不同的权限</p>
          <p class="text">对资产的创建,审批,评估的一体化管理</p>
          <p class="text">具有流程追踪和申办记录的能力</p>
          <img src="@/assets/img.png" style="margin-top: 10px" alt="" />
        </div>
      </div>
    </div>
    <ul class="footer">
      <li>了解我们</li>
      <li>招商电话</li>
      <li>广告连接</li>
      <li>售后服务</li>
      <li>远程服务</li>
      <li>在线咨询</li>
      <li>漏洞上报</li>
      <li>关于其他</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "brochure",
  methods: {
    jumpLogin() {
      this.$router.push("/login");
    },
  },
};
</script>

<style lang="less" scoped>
.box {
  height: 1400px;
  position: relative;
  .brochureHeader {
    box-sizing: border-box;
    border-bottom: 2px solid var(--border-color1);
    position: fixed;
    z-index: 10;
    height: 100px;
    width: 100%;
    background-color: var(--background-color1);
    display: flex;
    .logo {
      height: 100px;
      padding: 10px;
      // background: #fff;
    }
    .headerTitle {
      display: flex;
      li {
        font-size: 24px;
        margin-right: 30px;
        margin-left: 30px;
        line-height: 100px;
        color: var(--text-color1);
        cursor: pointer;
      }
    }
  }
  .content {
    // margin-top: 100px;
    background-image: linear-gradient(var(--background-color2), #fff);
    width: 100%;
    position: absolute;
    top: 100px;
    .imgSwiper {
      padding: 10px 220px 50px;
    }
    .introduce {
      // display: flex;
      // background: var(--background-color1);
      width: 100%;
      height: 1300px;
      padding: 50px 100px 50px;
      .text {
        font-size: 20px;
        margin: 10px;
      }
      .contentLeft {
        float: left;
      }
      .contentRight {
        float: left;
        margin-top: 10px;
      }
      .activeImg {
        float: left;
        margin-top: 100px;
      }
      .activeRight {
        float: left;
        margin-top: 100px;
        margin-left: 20px;
      }
    }
  }
  .footer {
    position: fixed;
    bottom: 0px;
    left: 0px;
    width: 100%;
    height: 100px;
    background: var(--backround-color4);
    li {
      float: left;
      margin: 40px 50px 10px;
      color: var(--text-color1);
    }
  }
}
.jumpLogin {
  font-size: 24px;
  margin-left: 100px;
  padding: 0 50px 0;
  line-height: 100px;
  color: var(--text-color2);
  border-radius: 50%;
  background: var(--backround-color5);
  // background: var(--background-color0);
  cursor: pointer;
}
// .jumpLogin:hover {
//   background: var(--background-color1);
//   color: #fff;
// }
.el-carousel__item h3 {
  display: flex;
  color: #475669;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
/deep/ .el-carousel__container {
  height: 480px;
}
</style>
