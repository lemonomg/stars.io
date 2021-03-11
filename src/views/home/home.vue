<template>
  <div class="home">
    <p v-for="count in 100" :key="count">{{ count }}</p>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component({})
export default class Home extends Vue {}
</script>

<style lang="scss">
</style>