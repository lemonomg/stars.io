<template>
  <div class="layout">
    <header>
      <nav-bar></nav-bar>
    </header>
    <section>
      <app-main></app-main>
    </section>
    <footer>
      <tab-bar></tab-bar>
    </footer>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import NavBar from "./components/NavBar.vue";
import TabBar from "./components/TabBar.vue";
import AppMain from "./components/AppMain.vue";

@Component({
  components: { NavBar, TabBar, AppMain },
})
export default class Index extends Vue {
  public onClickLeft() {
    console.log(123);
    this.$router.go(-1);
  }
}
</script>

<style lang="scss">
</style>