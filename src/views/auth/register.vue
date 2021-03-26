<template>
  <div class="account">
    <nav-bar />
    <van-form>
      <van-field
        label="用户名"
        v-model="registerForm.account"
        placeholder="4-10位 数字与字母的组合"
      />
      <van-field
        label="密码"
        v-model="registerForm.password"
        type="password"
        placeholder="6-18位 字母数字特殊符号"
      />
      <van-field
        label="确认密码"
        v-model="registerForm.passwordOK"
        type="password"
        placeholder="确认密码"
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
          <van-button
            size="small"
            :disabled="!btnDisabled"
            plain
            @click="sendEmailCode()"
            type="info"
            >{{ codeText }}</van-button
          >
        </template>
      </van-field>
      <div style="margin: 16px">
        <van-button
          block
          :disabled="btnDisabled"
          type="info"
          @click="handleRegister()"
          >注册</van-button
        >
        <p class="account-link">
          <router-link to="/login">去登录</router-link>
        </p>
      </div>
    </van-form>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { BaseAction, UserAction } from "@/api/interface";
import { reg } from "@/utils/reg";
import { Toast } from "vant";
import Http from "@/http";
import NavBar from "./NavBar.vue";
interface RegisterForm {
  account: string;
  password: string;
  passwordOK: string;
  email: string;
  emailCode: string;
}

@Component({ components: { NavBar } })
export default class Register extends Vue {
  private registerForm: RegisterForm = {
    account: "",
    password: "",
    passwordOK: "",
    email: "",
    emailCode: "",
  };
  private TIMER_TIME = 60;
  private times = this.TIMER_TIME;
  private timer: any = null;
  private http: Http = new Http();
  private btnDisabled = true;

  get codeText() {
    return this.times === this.TIMER_TIME
      ? "获取验证码"
      : `${this.times}S后重试`;
  }
  async handleRegister() {
    // 如果发送验证码成功则进行注册
    if (await this.sendEmailCode()) {
    }
  }

  async sendEmailCode() {
    if (this.checkRegisterForm()) {
      // TODO: 发送验证码
      const res = await this.http.Post(
        BaseAction.SEND_EMAILCODE,
        this.registerForm
      );
      if (res.data) {
        this.startTimer();
        Toast("验证码已发送至您的邮箱");
        this.btnDisabled = false;
        return true;
      }
      return false;
    } else {
      this.checkRegisterForm();
      return false;
    }
  }
  // 发送验证码按钮的计时器
  private startTimer() {
    if (this.times !== this.TIMER_TIME) {
      return;
    }
    const that = this;
    this.timer = setTimeout(function temp() {
      that.timer = setTimeout(temp, 1000);
      if (that.times <= 0) {
        clearTimeout(that.timer);
        that.times = that.TIMER_TIME;
      } else {
        that.times--;
      }
    }, 0);
  }
  // 验证表单数据
  private checkRegisterForm(): boolean {
    const { account, password, passwordOK, email } = this.registerForm;
    if (!reg.account.test(account)) {
      Toast.fail("请输入正确的用户名格式");
      return false;
    } else if (password.length < 6 || password.length > 18) {
      Toast.fail("请输入正确的密码格式");
      return false;
    } else if (password !== passwordOK) {
      Toast.fail("两次输入密码不一致");
      return false;
    } else if (!reg.email.test(email)) {
      Toast.fail("请输入正确的邮箱格式");
      return false;
    } else {
      return true;
    }
  }
}
</script>

<style lang="scss">
@import "./index.scss";
</style>