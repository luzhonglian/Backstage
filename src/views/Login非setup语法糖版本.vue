<!-- 
  用setup语法糖和不用分别写了一版
  发觉setup语法糖是真好用
 -->
<template>
  <div class="login-box">
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      status-icon
      :rules="rules"
      label-width="80px"
      class="demo-ruleForm"
    >
      <h2>后台管理</h2>
      <br />
      <el-form-item label="username" prop="username">
        <el-input v-model="ruleForm.username" autocomplete="off" />
      </el-form-item>

      <el-form-item label="password" prop="password">
        <el-input
          v-model="ruleForm.password"
          type="password"
          autocomplete="off"
        />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm(ruleFormRef)"
          >login</el-button
        >

        <el-button @click="resetForm()">Reset</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, ref } from "vue";
import { LoginData } from "../type/login";
import type { FormInstance } from "element-plus";
import { login } from "../request/api";
import { useRouter } from "vue-router"; //setup has no $router so need to import this
export default defineComponent({
  setup() {
    const data = reactive(new LoginData());
    const rules = {
      username: [
        {
          required: true,
          message: "Please input name",
          trigger: "blur",
        },
        {
          min: 3,
          max: 12,
          message: "Length should be 3 to 12",
          trigger: "blur",
        },
      ],
      password: [
        {
          required: true,
          message: "Please input Activity password",
          trigger: "blur",
        },
        {
          min: 3,
          max: 12,
          message: "Length should be 3 to 12",
          trigger: "blur",
        },
      ],
    };
    //login
    const ruleFormRef = ref<FormInstance>();
    const router = useRouter();
    const submitForm = async (formEl: FormInstance | undefined) => {
      if (!formEl) return;

      await formEl.validate((valid, fields) => {
        if (valid) {
          login(data.ruleForm)
            .then((res) => {
              if (res.data.success == true) {
                localStorage.setItem("token", res.data.token);

                router.push("/");
              }
            })
            .catch((e) => {
              console.log("wrong");
            });
        } else {
          console.log("error submit!", fields);
        }
      });
    };

    //reset
    const resetForm = () => {
      data.ruleForm.password = "";
      data.ruleForm.username = "";
    };
    return { ...toRefs(data), rules, submitForm, ruleFormRef, resetForm };
  },
});
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
