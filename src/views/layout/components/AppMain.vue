<template>
  <div class="main-section">
    <router-view></router-view>
    <drag-ball />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import DragBall from "@/components/DragBall.vue";
@Component({ components: { DragBall } })
export default class AppMain extends Vue {}
</script>

<style>
.main-section {
  padding-top: 60px;
}
</style>