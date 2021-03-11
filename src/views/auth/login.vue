<template>
  <div class="login">
    <nav-bar></nav-bar>
    <h1>登录</h1>
    <van-form @submit="handleLogin()" label-align="center">
      <van-field
        label="用户名"
        placeholder="请输入用户名"
        v-model="loginForm.account"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        type="password"
        label="密码"
        placeholder="请输入密码"
        v-model="loginForm.password"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit"
          >登录</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Button, Field, Form } from "vant";
import NavBar from "./NavBar.vue";
import store from "@/store";
Vue.use(Button);
Vue.use(Form);
Vue.use(Field);
interface LoginForm {
  account: string;
  password: string;
}

@Component({
  components: { NavBar },
})
export default class Login extends Vue {
  private loginForm: LoginForm = {
    account: "",
    password: "",
  };
  public created() {
    console.log(process.env.VUE_APP_DECRY);
  }
  private handleLogin() {
    store.dispatch("user/login", this.loginForm).then((res) => {
      console.log(res);
    });
  }
}
</script>

<style>
.login {
  padding-top: 60px;
}
</style>