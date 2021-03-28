<template>
  <div class="my">
    <van-skeleton title avatar class="my-skeleton" :row="1" :loading="loading">
      <div>实际内容</div>
    </van-skeleton>
    <van-button block type="info" to="/login">立即登录</van-button>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Button, Skeleton } from "vant";
Vue.use(Button);
Vue.use(Skeleton);
@Component({})
export default class My extends Vue {
  private loading = true;
}
</script>

<style lang="scss">
.my {
  margin: 0 15px;
}
.my-skeleton {
  margin-bottom: 15px;
}
</style>