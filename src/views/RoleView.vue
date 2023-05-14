<template>
  <div>
    <el-form :inline="true"  class="demo-form-inline">
    <el-form-item>
      <el-button type="primary" @click="addRole">添加角色</el-button>
    </el-form-item>
</el-form>

    <el-table :data="list" border style="width: 100%">
      <el-table-column prop="roleId" label="ID" width="180" />
      <el-table-column prop="roleName" label="角色名" width="180" />
      <el-table-column label="编辑权限">
        <template #default="scope">
          <el-button link type="primary" size="small" @click="editAuthority(scope.row)"
            >修改权限</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, toRefs } from "vue";
import { getRoleList } from "@/request/api";
import {  RoleData } from "@/type/role";
import { ElMessage, ElMessageBox } from 'element-plus'
import 'element-plus/es/components/message-box/style/css';
import 'element-plus/es/components/message/style/css'; 
import { useRouter } from "vue-router";
 

const data = reactive(new RoleData());
onMounted(() => {
  getRole();
});

function getRole() {
  getRoleList().then((res) => {
    data.list = res.data;
  });
}


const router=useRouter()
let editAuthority = (row:any) => {
    router.push({
        name:'authority',
        params:{
            id:row.roleId,
            auths:row.authority.join(',')
        }      
    })
};

const addRole=()=>{
    ElMessageBox.prompt('输入角色名', '添加', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
  })
    .then(({ value }) => {
       if(value){
        data.list.push({
            authority:[],
            roleId:data.list.length+1,
            roleName:value
        })
       }
      ElMessage({
        type: 'success',
        message: `${value}角色已被添加`,
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消操作',
      })
    })
}

let { list } = toRefs(data);
</script>

<style scoped></style>
