<template>
  <div class="user-main">
    <template>
      <van-skeleton title avatar :row="1" :loading="isSgin" avatar-size="55px">
        <user-info></user-info>
      </van-skeleton>
      <van-button
        v-if="isSgin === true"
        type="info"
        block
        :style="{ width: '90%', margin: '30px auto' }"
        url="/login"
        >立即登录</van-button
      >
    </template>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Skeleton, Button } from "vant";
import { getLocaStorage } from "@/utils";
import { getToken } from "@/utils/auth";
import UserInfo from "./UserInfo.vue";
Vue.use(Skeleton, Button);
@Component({ components: { UserInfo } })
export default class My extends Vue {
  private isSgin = false;
  public created() {
    console.log();
    const userInfo = getLocaStorage("STARS_USER_INFO");
    const token = getToken();
    if (userInfo && token) {
      this.isSgin = false;
    } else {
      this.isSgin = true;
    }
  }
}
</script>

<style lang="scss">
</style>