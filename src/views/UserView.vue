<template>
  <div>
    <div class="select-box">
      <el-form :inline="true" :model="queryData" class="demo-form-inline">
        <el-form-item label="姓名">
          <el-input v-model="queryData.nickname" placeholder="请输入姓名" />
        </el-form-item>

        <el-form-item label="角色">
          <el-select
            v-model="queryData.roleId"
            class="m-2"
            placeholder="请选择"
            size="large"
          >
            <el-option label="全部" :value="0" />
            <el-option
              v-for="item in roleList"
              :key="item.roleId"
              :label="item.roleName"
              :value="item.roleId"
            />
            <!-- lable：显示的值 value:传给后台的值 -->
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit"
            ><el-icon><Search /></el-icon>查询</el-button
          >
        </el-form-item>
      </el-form>
    </div>

    <div class="show-table">
      <el-table :data="userList" border style="width: 100%">
        <el-table-column prop="id" label="ID" width="180" />

        <el-table-column prop="nickname" label="姓名" width="180" />

        <el-table-column prop="role" label="角色">
          <template #default="scope">
            <el-button
              v-for="item in scope.row.role"
              :key="item.roleId"
              type="primary"
              size="small"
            >
              {{ item.roleName }}
            </el-button>
          </template>
        </el-table-column>

        <el-table-column prop="role" label="操作">
          <template #default="scope">
            <el-button
              link
              type="primary"
              size="small"
              @click="editUser(scope.row)"
            >
              编辑
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog v-model="isShow" title="编辑信息">
      <el-form :model="active">
        <el-form-item label="姓名" label-width="50px">
          <el-input v-model="active.nickname" autocomplete="off" />
        </el-form-item>
        <el-form-item label="角色" label-width="50px">
          <el-select multiple v-model="active.roleId" placeholder="请选择角色">
            <el-option
              v-for="item in roleList"
              :key="item.roleId"
              :label="item.roleName"
              :value="item.roleId"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="() => (isShow = false)">取消</el-button>
          <el-button type="primary" @click="updateUser"> 更改 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { getUserList } from "@/request/api";
import { getRoleList } from "@/request/api";
import { onMounted, reactive, toRefs, watch } from "vue";
import { UserData, IUser } from "../type/user";
import { Search } from "@element-plus/icons-vue";

const data = reactive(new UserData());

onMounted(() => {
  getUser();
  getRole();
});

const getUser = () => {
  getUserList().then((res) => {
    data.userList = res.data;
  });
};
const getRole = () => {
  getRoleList().then((res) => {
    data.roleList = res.data;
  });
};

const onSubmit = () => {
  let arr: IUser[] = [];
  //nickname/role exist,put data.list item in arr
  if (data.queryData.nickname || data.queryData.roleId) {
    if (data.queryData.nickname) {
      arr = data.userList.filter((i) => {
        return i.nickname.indexOf(data.queryData.nickname) != -1;
      });
    }
    if (data.queryData.roleId) {
      arr = (data.queryData.nickname ? arr : data.userList).filter((v) => {
        return v.role.find((item) => item.roleId == data.queryData.roleId);
      });
    }
    arr = arr.filter((item, index) => {
      return arr.indexOf(item) == index;
    });
  } else {
    arr = data.userList;
  }
  data.userList = arr;
};

watch([() => data.queryData.nickname, () => data.queryData.roleId], () => {
  if (data.queryData.nickname == "" || data.queryData.roleId == 0) {
    getUser();
  }
});

const editUser = (row: any) => {
  data.active = {
    id: row.id,
    nickname: row.nickname,
    roleId: row.role.map((item) => item.roleId),
    username: row.username,
  };

  data.isShow = true;
};
/* updataUser 思路：
把active的内容改造为实际渲染的类型
然后在userlist中替换
*/
const updateUser = () => {
  let obj: any = data.userList.find((i) => i.id == data.active.id);
  obj.nickname = data.active.nickname;
  obj.role = data.roleList.filter(
    (i) => data.active.roleId.indexOf(i.roleId) != -1
  );
  data.userList.forEach((e, i) => {
    if (e.id == data.active.id) {
      data.userList[i] = obj;
    }
  });
  data.isShow = false;
};
let { isShow, active, queryData, userList, roleList } = toRefs(data);
</script>

<style scoped></style>
