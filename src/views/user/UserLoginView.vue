<template>
  <div class="userlogin">
    <a-form :model="form" :style="{ width: '600px' }" @submit="handleSubmit">
      <a-form-item field="userAccount" label="用户">
        <a-input v-model="form.userAccount" placeholder="请输入用户名" />
      </a-form-item>
      <a-form-item field="post" label="密码">
        <a-input-password
          text="password"
          v-model="form.userPassword"
          titlebox="密码"
          placeholder="请输入密码"
        />
      </a-form-item>
      <a-form-item>
        <a-button class="submit" html-type="submit">登录</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import message from "@arco-design/web-vue/es/message";
import { UserControllerService, UserLoginRequest } from "../../../generated";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const router = useRouter();
const store = useStore();

const form = reactive({
  userAccount: "",
  userPassword: "",
} as UserLoginRequest);

const handleSubmit = async () => {
  console.log(form);
  const res = await UserControllerService.userLoginUsingPost(form);
  if (res.code === 0) {
    await store.dispatch("user/getLoginUser");
    message.success("登录成功");
    router.push({
      path: "/",
      replace: true,
    });
  } else {
    message.error("登录失败:" + res.message);
  }
};
</script>

<style>
.submit {
  width: 100%;
}
</style>
