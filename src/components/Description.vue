<template>
  <div class="description-box">
      <h5>语言转写与优化</h5>
      <p>录音/实时识别、语言模型定制、行业热词定制</p>
      <h5>智能质检</h5>
      <p>自动、全量质检、减员增效</p>
      <h5>智能风控</h5>
      <p>无效客户筛查、反骚扰控投诉</p>
      <h5>智能对话分析</h5>
      <p>用户画像、座席画像</p>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';

@Component({
  name: 'Description'
})
export default class Description extends Vue {

}
</script>


<style scoped lang="scss">
@import '../styles/vars.scss';
.description-box{
  padding-left: 40px;
}
h5{
  font-size: 18px;
  font-weight: normal;
  color: $primary-color;
  margin: 56px 0 10px;
}
p{
  color: #9B9B9B;
  margin: 10px 0 56px;  
}
</style>