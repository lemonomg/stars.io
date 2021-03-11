<template>
  <van-nav-bar
    :title="$route.meta.title"
    :left-text="leftText"
    @click-left="onClickLeft"
    class="main-navbar"
  />
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { NavBar } from "vant";
Vue.use(NavBar);

@Component({})
export default class NavBars extends Vue {
  private leftText = "";
  beforeRouteEnter(to: any, from: any, next: () => void): void {
    console.log(to, from, next());
  }

  private onClickLeft() {
    // 返回上一页
    this.$router.go(-1);
  }
}
</script>

<style>
.main-navbar {
  position: fixed;
  left: 0px;
  right: 0px;
  top: 0;
}
</style>