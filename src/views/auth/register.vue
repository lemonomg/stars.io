<template>
  <div class="account">
    <nav-bar />
    <van-form>
      <van-field
        label="用户名"
        v-model="registerForm.account"
        placeholder="请输入用户名"
      />
      <van-field
        label="密码"
        v-model="registerForm.password"
        type="password"
        placeholder="请输入密码"
      />
      <van-field
        label="确认密码"
        v-model="registerForm.passwordOK"
        type="password"
        placeholder="请重新输入密码"
      />
      <van-field
        label="邮箱"
        v-model="registerForm.email"
        placeholder="请输入邮箱"
      ></van-field>
      <van-field
        center
        clearable
        label="邮箱验证码"
        placeholder="请输入邮箱验证码"
      >
        <template #button>
          <van-button size="small" plain type="info">发送验证码</van-button>
        </template>
      </van-field>
      <div style="margin: 16px">
        <van-button block type="info">注册</van-button>
        <p class="account-link">
          <router-link to="/login">去登录</router-link>
        </p>
      </div>
    </van-form>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import NavBar from "./NavBar.vue";
interface RegisterForm {
  account: string;
  password: string;
  passwordOK: string;
  email: string;
}

@Component({ components: { NavBar } })
export default class Register extends Vue {
  private registerForm: RegisterForm = {
    account: "",
    password: "",
    passwordOK: "",
    email: "",
  };
}
</script>

<style lang="scss">
@import "./index.scss";
</style>