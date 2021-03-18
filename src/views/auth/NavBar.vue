<template>
  <van-nav-bar
    class="account-navbar"
    left-text="返回"
    :title="$route.meta.title"
    @click-left="onClickLeft"
  />
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { NavBar } from "vant";
Vue.use(NavBar);

@Component({})
export default class NavBars extends Vue {
  private onClickLeft() {
    // 返回上一页
    this.$router.go(-1);
  }
}
</script>

<style scoped>
.account-navbar {
  margin-bottom: 15px !important;
}
</style>