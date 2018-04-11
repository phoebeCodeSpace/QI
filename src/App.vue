<template>
  <div id="app">
    <div id="nav">
      <!-- <Tab/> -->
    </div>
    <router-view/>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Tab from '@/components/Tab.vue';

@Component({
  components: {
    Tab,
  },
})
export default class App extends Vue {}
</script>

<style lang="scss">
@import './styles/reset.scss';
#app{
  width: 1200px;
  margin: 10px auto;
  height: 100vh;
}
</style>
