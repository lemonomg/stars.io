<!-- 点击发布按钮的弹出层 -->
<template>
  <van-popup
    v-model="isShowPopupSync"
    position="top"
    class="app-popup"
    @close="close()"
    closeable
    close-icon-position="bottom-right"
    :style="{ height: '30%' }"
  >
    <van-row class="add-row">
      <van-col span="12">
        <img src="../../../assets/add-video.png" />
        <div class="add-title">发布视频动态</div>
      </van-col>
      <van-col span="12">
        <img src="../../../assets/add-image.png" />
        <div class="add-title">发布图片动态</div>
      </van-col>
    </van-row>
  </van-popup>
</template>

<script lang="ts">
import { Vue, Component, PropSync } from "vue-property-decorator";
import { Popup, Row, Col } from "vant";
Vue.use(Popup);
Vue.use(Row);
Vue.use(Col);

@Component({})
export default class Popups extends Vue {
  @PropSync("isShowPopup", { type: Boolean, default: false })
  public isShowPopupSync!: boolean;
  close() {
    this.$emit("close", false);
    this.$emit("isShowPopup", false);
  }
}
</script>

<style lang="scss" scoped>
.app-popup {
  display: flex;
  justify-content: center;
  align-items: center;
  .add-row {
    width: 100%;
    .van-col {
      text-align: center;
      img {
        width: 55px;
        height: 55px;
      }
      .add-title {
        text-align: center;
        font-size: 15px;
        color: rgb(97, 97, 97);
      }
    }
  }
}
</style>