<template>
  <div class="user-info">
    <van-image class="user-avatar" round :src="user.userInfo.avatar" />
    <div class="user-content">
      <h3>{{ user.userInfo.nickname }}</h3>
      <p>账号:{{ user.userInfo.account }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Image } from "vant";
import { State } from "vuex-class";

import { UserReponse } from "@/models/user.model";
Vue.use(Image);

@Component({})
export default class Index extends Vue {
  @State("user") readonly user!: UserReponse;
}
</script>

<style lang="scss">
.user-info {
  display: flex;
  padding: 0 16px;
  align-items: center; /*垂直交叉轴居中*/
  .user-avatar {
    width: 100px;
    height: 100px;
    flex-shrink: 0;
    margin-right: 16px;
  }
  .user-content {
    p {
      color: #bcc5d2;
    }
  }
}
</style>