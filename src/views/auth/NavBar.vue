<template>
  <van-nav-bar left-text="返回" @click-left="onClickLeft" />
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

<style>
.van-nav-bar {
  position: fixed;
  left: 0px;
  right: 0px;
  top: 0;
}
</style>