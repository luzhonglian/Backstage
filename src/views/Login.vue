<!-- 输入VB快速生成模板 -->
<template>
  <div class="login-box">
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      status-icon
      :rules="rules"
      label-width="70px"
      class="demo-ruleForm"
    >
      <h2>后台管理</h2>
      <br />
      <el-form-item label="用户名" prop="username">
        <el-input
          v-model="ruleForm.username"
          type="username"
          autocomplete="off"
        />
      </el-form-item>

      <el-form-item label="密码" prop="password">
        <el-input
          v-model="ruleForm.password"
          type="password"
          autocomplete="off"
        />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm(ruleFormRef)"
          >登录</el-button
        >
        <el-button @click="resetForm(ruleFormRef)">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import type { FormInstance } from "element-plus";
import { login } from "../request/api";
import { useRouter } from "vue-router";
//表单数据
interface ILoginData {
  username: string;
  password: string;
}
const ruleForm: ILoginData = reactive({
  username: "",
  password: "",
});
//表单规则
const rules = reactive({
  password: [
    { required: true, message: "Please input passwordk", trigger: "blur" },
    { min: 3, max: 15, message: "Length should be 3 to 15", trigger: "blur" },
  ],
  username: [
    { required: true, message: "Please input username", trigger: "blur" },
    { min: 3, max: 15, message: "Length should be 3 to 15", trigger: "blur" },
  ],
});

const ruleFormRef = ref<FormInstance>();
const router = useRouter();
//点击登录后提交表单
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      login(ruleForm).then((res) => {
        if (res.data.success === true) {
          localStorage.setItem("token", res.data.token);
          router.push("/goods");
        } else alert("账号密码错误");
      });
    } else {
      console.log("error submit!");
      return false;
    }
  });
};

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};
</script>

<style lang="scss" scoped>
.login-box {
  width: 100%;
  height: 100%;
  background: url("../assets/food.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  padding: 1px;
  text-align: center;
}
.demo-ruleForm {
  width: 400px;
  margin: 150px 300px;
  background-color: antiquewhite;
  padding: 20px;
  border-radius: 20px;
}
</style>
