<template>
  <div class="home">
    <el-container>
      <!-- header -->
      <el-header height="100px">
        <el-row :gutter="20">
          <el-col :span="4"
            ><img src="../assets/logo.png" alt="" class="logo"
          /></el-col>
          <el-col :span="16"><h2>后台管理系统</h2></el-col>
          <el-col :span="4"
            ><span class="quit-login" @click="quitLogin">退出登录</span></el-col
          >
        </el-row>
      </el-header>
      <el-container>
        <!-- left -->
        <el-aside width="10vw">
          <el-menu
            active-text-color="#ffd04b"
            background-color="#545c64"
            class="el-menu-vertical-demo"
            :default-active="active"
            text-color="#fff"
            router
          >
            <!-- router:开启vue-router模式，以index作为path进行路由跳转 -->
            <el-menu-item :index="i.path" v-for="i in list" :key="i.name">
             <el-icon> <component :is="i.meta.icon" /></el-icon>
              <span>{{ i.meta.title }}</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <!-- right -->
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import { useRouter,useRoute } from "vue-router";
const router = useRouter();
const route=useRoute()
let active=route.path
// console.log(router.getRoutes())
const list = router.getRoutes().filter((v) => v.meta.isShow);
function quitLogin() {
  router.push("/login");
}
</script>

<style lang="scss" scoped>
.el-header {
  background-color: rgb(215, 238, 250);
  .logo {
    height: 100px;
  }
  h2,
  .quit-login {
    height: 100px;
    text-align: center;
    line-height: 100px;
  }
  .quit-login {
    color: rgba(255, 0, 0, 0.55);
  }
}
.el-aside {
  min-width: 126px;
 
  .el-menu {
    height: calc(100vh - 100px);
    
  }
  .el-menu-item{
    margin:0 auto
  }
}

.home{
  min-width: 880px;
}
</style>
