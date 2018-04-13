<template>
  <div class="list">
    <h3>列表切换</h3>
    <ul>
      <router-link v-for="item in list" :key="item" tag="li"
        :to="{ name: 'QICoversation', params: { title: item }}">
        {{ item }}
      </router-link>
    </ul>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Watch, Vue} from 'vue-property-decorator';
import { State, Action } from 'vuex-class';


@Component({
  name: 'List',
  props: {
    list: {
      type: Array,
      default: () => []
    }
  }
})
export default class List extends Vue {
  // @State('')
  mounted () {
  
  }
}
</script>

<style lang="scss">
@import '../styles/mixin.scss';

.list{
  @include size(200px,560px);
  box-shadow: 0 2px 4px 0 rgba(0,0,0,0.21);
  margin-right: 20px;
  background-color: #fff;
  $padding:0 20px;
  overflow: hidden;
  &>h3{
    padding: $padding;
    font-weight: normal;
    line-height: 40px;
    @include skin(#fff,$primary-color);
    font-size: 14px;
  }
  &>ul{
    height: 520px;
    overflow-y: auto;
    margin-top: 1px;
    li{
      padding: $padding;
      color: #666;
      line-height: 51px;
      border-bottom: 1px solid #ddd;
      @extend %ellipsis;
      cursor: pointer;
      transition: all linear .35s;
      &.active{
        color: $primary-color;
      }
      &+li{
        border-bottom: 1px solid #ddd;
      }
      &:hover{
        background: #F1FBFF;
      }
    }
  }
}

</style>
