<template>
  <div>
    <van-tabbar v-model="active" fixed route class="main-tabbar">
      <van-tabbar-item
        v-for="(item, index) in tabBarItem"
        :key="index"
        :to="item.to"
      >
        <svg-icon :icon-class="item.icon" :style="{ 'font-size': '25px' }" />
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Tabbar, TabbarItem, Icon } from "vant";
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(Icon);
@Component({})
export default class TabBar extends Vue {
  public active = 0;
  public isShowPopup = false;

  private tabBarItem = [
    {
      to: "/home",
      icon: "home",
    },
    {
      to: "/search",
      icon: "search",
    },
    {
      to: "/message",
      icon: "bell",
    },
    {
      to: "/my",
      icon: "user",
    },
  ];
}
</script>

<style lang="scss">
</style>