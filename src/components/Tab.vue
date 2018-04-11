<template>
  <div class="tab">
      <router-link to="/">双轨录音无限存储</router-link>
      <router-link to="/">智能质检</router-link>
      <router-link to="/">流式实时计算</router-link>
      <router-link to="/">基于“云”的预测式外呼</router-link>
      <router-link to="/">分布式坐席</router-link>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  name: 'Tab'
})
export default class Tab extends Vue {}
</script>

<style lang="scss">
@import '../styles/vars.scss';
.tab{
  a{
    display: inline-block;
    color: $primary-color;
    border: 1px solid $primary-color;
    background-color: $secondary-color;
    padding: 10px 50px;
    margin: 0 10px;
  }
}
</style>
