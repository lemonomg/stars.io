<template>
  <div><van-skeleton title avatar :row="2" avatar-size="55px" /></div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Skeleton } from "vant";
import CryptoHelper from "@/utils/crypt";
Vue.use(Skeleton);
@Component({})
export default class My extends Vue {
  public created() {
    const Crypt = new CryptoHelper();
    console.log(Crypt.encrypt("1879178791"));
    console.log(Crypt.decrypt("WTcBVVj/DoJ5nZzPgXCbEg=="));
    console.log(process.env.VUE_APP_BASE_API)
  }
}
</script>

<style lang="scss">
</style>