<template>
  <div class="main-section">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component({})
export default class AppMain extends Vue {}
</script>

<style>
.main-section {
  padding-top: 60px;
}
</style>