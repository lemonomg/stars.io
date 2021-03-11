<template>
  <div>
    <template>
      <van-skeleton title avatar :row="1" avatar-size="55px" />
    </template>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Skeleton } from "vant";
Vue.use(Skeleton);
@Component({})
export default class My extends Vue {}
</script>

<style lang="scss">
</style>