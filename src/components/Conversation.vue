<template>
  <div class="conversation-box" ref="conversationBox">
    <div v-for="(item,index) in conversationArr" :key="index" 
         class="conversation-item" :class="item.type"
    >
    
        <div class="bubble" :start-time="item.start | formatTime">{{item.text}}</div>
        <div class="avatar-block">
          <span class="avatar">
            <svg class="user" aria-hidden="true">
                <use xlink:href="#icon-yonghu"></use>
            </svg>
          </span>
        </div>
      </div>
  </div>
</template>

<script lang="ts">
import { Component, Watch, Vue } from 'vue-property-decorator';
import { State, Action, Getter } from 'vuex-class';
import {formatTime} from '@/filters/formatTime';
interface conversation {
  text: string;
  start: number;
  end: number;
  type? : "customer" | "service"
}

@Component({
  name: 'Conversation',
  props : {
    service: {
      type: Array,
      default: () => []
    },
    customer: {
      type: Array,
      default: () => []
    }
  },
  filters:{
    formatTime
  }
})
export default class Conversation extends Vue {
  totalConversationArr:Array<conversation> = [];
  conversationArr:Array<conversation> = [];

  @State('current') current: number;

  @Watch('service')
  serviceChanged(val:Array<conversation> , oldVal: Array<conversation>) {
    this.totalConversation();
  }
  @Watch('customer')
  customerChanged(val:Array<conversation> , oldVal: Array<conversation>) {
    this.totalConversation();
  }

  @Watch('current')
  currentChanged(val:number, oldVal:number){
    this.conversationArrChanged();
  }

  totalConversation(){
    let conversationArr : Array<conversation> = [];
    const serviceArr = this.$props.service.map( (item:Array<conversation>) => ({...item, type: "service"}));
    const customerArr = this.$props.customer.map( (item:Array<conversation>) => ({...item, type: "customer"}));

    conversationArr = [].concat(serviceArr,customerArr);
    
    conversationArr.sort((a: conversation, b: conversation) => {
      return a.start - b.start
    })
    this.totalConversationArr = conversationArr;
  }
  conversationArrChanged(){
    const self = this;
    const sortArr = this.totalConversationArr.filter((item) => {
      return item.start<this.current;
    });
    this.conversationArr = sortArr;

    if(sortArr.length){
      window.requestAnimationFrame(self.scroll);
    }
  }

  scroll(){
    const self = this;
    const $conversationBox = this.$refs.conversationBox as HTMLDivElement;
    $conversationBox.scrollTop = $conversationBox.scrollHeight;
    window.requestAnimationFrame(self.scroll);   
  }
}
</script>


<style lang="scss">
@import '../styles/vars.scss';
.conversation-box{
  width: 556px;
  height: 400px;
  padding: 30px;
  margin-top: 20px;
  overflow-y: scroll;
  transition: all linear .4s;


  .conversation-item{
    display: flex;
    align-items: center;
    margin-bottom: 23px;
    justify-content: flex-end;
    &.service{
      .avatar-block{
        margin-left: 20px;        
      }
      .bubble{
        &::before{
          right: 0;
        }
        &::after{
          right: -8px;
          background-image: url('../assets/icon/right.png');
        }
      }
    }
    &.customer{
      flex-direction: row-reverse;
        .avatar-block{
          margin-right: 20px;   
        }
        .bubble{
          &::before{
            left: 0;
          }
          &::after{
            left: -9px;;
            background-image: url('../assets/icon/left.png');
          }
        } 
    }
  }
  .bubble{
    position: relative;
    max-width: 330px;
    background-color: $secondary-color;
    border: 1px solid $primary-color;
    padding: $bubble-size;
    border-radius: $bubble-radius;
    color: $primary-color;
    &::before,&::after{
      position: absolute;      
    }
    &::before{
      bottom: -20px;
      content: attr(start-time);
      color: $subsidiary-color;
      font-size: 12px;
    }
    &::after{
      content: '';
      display: inline-block;
      width: 10px;
      height: 14px;
      top: 50%;
      transform: translateY(-50%);
      background: {
        position: center;
        repeat: no-repeat;
        size: contain;
      }   
    }
  }
  .avatar-block{
    text-align: center;
    color: $primary-color;
  }
  .avatar{
    width: 40px;
    height: 40px;
    padding: 7px 0;
    margin-bottom: 3px;
    display: inline-block;    
    background-color: $primary-color;
    border-radius: 50%;

    .user{
      width: 25px;
      height: 25px;
    }
  }
}
</style>
