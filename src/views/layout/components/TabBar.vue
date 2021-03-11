<template>
  <div>
    <van-tabbar v-model="active" route class="main-tabbar">
      <van-tabbar-item icon="home-o" to="/home">首页</van-tabbar-item>
      <van-tabbar-item
        class="tabbar-plus"
        @click="openPopup()"
        icon="add"
      ></van-tabbar-item>
      <van-tabbar-item icon="user-o" to="/my">我的</van-tabbar-item>
    </van-tabbar>
    <popup :isShowPopup.sync="isShowPopup" @close="close()"></popup>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import Popup from "./Popup.vue";
import { Tabbar, TabbarItem, Icon } from "vant";
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(Icon);
@Component({ components: { Popup } })
export default class TabBar extends Vue {
  public active = 0;
  public isShowPopup = false;
  // 打开弹出框
  private openPopup() {
    this.isShowPopup = true;
  }
  // 弹出框关闭
  private close() {
    this.isShowPopup = false;
  }
}
</script>

<style lang="scss">
.tabbar-plus {
  i {
    font-size: 70px;
    z-index: 9999999;
    color: #1989fa;
  }
  padding-bottom: 38px;
}
.main-tabbar {
  position: fixed;
  right: 0;
  left: 0;
  bottom: 0;
}
</style>