<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Tab from '@/components/Tab.vue';

@Component
export default class App extends Vue {}
</script>

<style lang="scss">
@import './styles/reset.scss';

#app{
  // display: flex;
  // justify-items: center;
  width: 1450px;
  padding: 157px 0;
  margin: 0 auto;
  height: 100vh;

}
</style>
