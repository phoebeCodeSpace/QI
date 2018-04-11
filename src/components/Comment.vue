<template>
  <div class="comment-box">
    <h2>请您评分</h2>
    <!-- 选择模板 -->
    <p class="explain">评分  *  权重</p>
    <p>专业水平：<input type="number" v-model="evaluating1"> <span>* 40%</span></p>
    <p>态度语气：<input type="number" v-model="evaluating2"> <span>* 30%</span></p>
    <p>解决程度：<input type="number" v-model="evaluating3"> <span>* 30%</span></p>
    <p>质量评语：<textarea name="" rows="2"></textarea></p>
    <p class="total">总分：{{total}}</p>
    <p class="save"><button>保存并为下一个评分</button></p>
  </div>
</template>

<script lang="ts">
import {Component, Model , Vue} from "vue-property-decorator";

@Component({
  name: 'Comment'
})
export default class Comment extends Vue {
  evaluating1:number = 0
  evaluating2:number = 0
  evaluating3:number = 0
  get total() {
    return (this.evaluating1*0.4 + this.evaluating2*0.3 + this.evaluating3*0.3).toFixed(2)
  }
} 

</script>

<style lang="scss">
@import '../styles/vars.scss';

.comment-box{
  // float: right;
  border-left: 1px dashed $primary-color;
  padding: 20px;
  h2,p{
    color: $primary-color;
  }
  h2{
    font-size: 16px;
    font-weight: normal;
  }
  .explain{
    font-size: 12px;
    text-align: right;
  }
  p{
    margin-bottom: 20px;
    span{
      font-size: 12px;
    }
    input{
      width: 120px;
      padding: 5px;      
      border-bottom: 1px solid $primary-color;
    }
    textarea{
      width: 100%;
      border: 1px solid $primary-color;
      border-radius: 4px;
      padding: 5px;
      margin-top: 5px;
    }
  }
  .save{
    text-align: right;
  }
  button{
    text-align: center;
    background:$primary-color;
    color: #fff;
    border-radius: 4px;
    padding: 8px 10px;
    cursor: pointer;
    transition: all linear .3s;
    &:hover{
      background: mix($primary-color, #fff, 85%);
    }
  }
}
</style>
