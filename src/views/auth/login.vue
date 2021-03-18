<template>
  <div class="account">
    <nav-bar></nav-bar>
    <van-form class="account-form">
      <van-field
        label="用户名"
        placeholder="请输入用户名"
        v-model="loginForm.account"
      />
      <van-field
        type="password"
        label="密码"
        placeholder="请输入密码"
        v-model="loginForm.password"
      />

      <div style="margin: 16px">
        <van-button block @click="handleLogin()" type="info">登录</van-button>
        <van-button block plain to="register" type="info">注册</van-button>
        <p class="account-link">
          <router-link to="/findPassword">忘记密码</router-link>
        </p>
      </div>
    </van-form>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Button, Field, Form, Toast, Divider } from "vant";
import { namespace } from "vuex-class";
import NavBar from "./NavBar.vue";
Vue.use(Button);
Vue.use(Form);
Vue.use(Field);
Vue.use(Divider);
const UserModule = namespace("user");
interface LoginForm {
  account: string;
  password: string;
}

@Component({
  components: { NavBar },
})
export default class Login extends Vue {
  @UserModule.Action("login")
  public login!: (user: LoginForm) => Promise<any>;

  private loginForm: LoginForm = {
    account: "",
    password: "",
  };
  /** 登录 */
  private handleLogin() {
    if (this.checkLogin()) {
      Toast.loading({
        message: "登录中...",
        forbidClick: true,
      });
      this.login(this.loginForm).then(() => {
        this.$router.push({ path: "/my" });
        Toast.clear();
      });
    } else {
      return false;
    }
  }
  // 对表单数据进行基础校验
  private checkLogin(): boolean {
    const account = this.loginForm.account as string;
    const password = this.loginForm.password as string;
    if (account.trim().length < 1) {
      Toast.fail("请输入用户名");
      return false;
    } else if (password.trim().length < 6) {
      Toast.fail("密码不能小于6位");
      return false;
    } else {
      return true;
    }
  }
}
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>