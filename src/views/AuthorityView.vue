<template>
  <div class="authStyle">
    <h1>权限管理</h1>
    <el-tree
        ref="treeRef"
      :data="treeList"
      show-checkbox
      node-key="name"
      :default-checked-keys="checkedKeys"
      :props="defaultProps"
      default-expand-all
    />
    <el-button @click="changeAuth">确认修改</el-button>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { getAuthorityList } from "@/request/api";
import { onMounted, reactive, toRefs } from "vue";
import { Auth } from "@/type/authority";
const route = useRoute();
/* 处理传过来的参数 */
let params = {
  id: Number(route.params.id),
  auths: (route.params.auths as string).split(",").map((i) => Number(i)),
};

let data = reactive(new Auth(params.id, params.auths));
const defaultProps = {
  children: "authList",
  label: "name",
};
/* 拿到有的权限，搜索data.auths的每一项在data.treeList的authList里的name是什么 */
let checkedKeys: string[] = [];
let getCheckedKeys = () => {
  data.treeList.forEach((element) => {
    element.authList.forEach((item) => {
      if (params.auths.indexOf(item.authId) != -1) {
        checkedKeys.push(item.name);
      }
    });
  });
};

let changeAuth=()=>{
       console.log(data.treeRef.getCheckedNodes())
       let checkedNames=data.treeRef.getCheckedNodes().filter(item=>item.authId).
map(item=>item.name).join('\n')
       /* 提交后台 */
       alert('当前角色所有权限更新为:\n'+checkedNames)
}
onMounted(() => {
  getAuthorityList().then((res) => {
    data.treeList = res.data;
    getCheckedKeys();
  });
});

let { treeList,treeRef } = toRefs(data);
</script>

<style scoped lang='scss'>
.authStyle{
  display: flex;
  align-items: left;
  flex-direction: column;
  .el-button{
    width: 12vw;
  }
}
</style>
