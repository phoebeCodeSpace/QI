<template>
  <div class="conversation-wrap">
      <button @click="showAllConversation" class="jump-button" 
              :class="{'active':showAll}"
              ref="showAllConversation"
      >跳过播放</button>     
  <div class="conversation-box" ref="conversationBox">
    <div v-for="(item,index) in conversationArr" :key="index" 
         class="conversation-item" :class="item.type"
    >
        <div class="bubble" :start-time="item.start | formatTime" v-html="item.transferText"></div>
        <div class="avatar-block" :role="item.type === 'service' ? '坐席' : '客户'">
          <span class="avatar">
            <svg class="user" aria-hidden="true">
                <use xlink:href="#icon-yonghu"></use>
            </svg>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Watch, Prop, Vue } from 'vue-property-decorator';
import { State, Action } from 'vuex-class';
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
  @State('showAll') showAll!: boolean;
  @State('current') current!: number;
  @Action('changeConversationState') changeConversationState:any;

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
    !this.showAll && this.conversationArrChanged();
  }

  showAllConversation(){
    const audioElement = this.$refs.audioRecord as HTMLAudioElement;
    // audioElement.currentTime = audioElement.duration;
    this.changeConversationState(true);
    this.conversationArr = this.totalConversationArr;
    this.scroll();
  }

  totalConversation(){
    let conversationArr : Array<conversation> = [];
    const serviceArr = this.$props.service.map( (item: conversation) => 
        ({...item, type: "service", transferText: item.text.replace(/{{/g,'<span>').replace(/}}/g,'</span>')}));
    const customerArr = this.$props.customer.map( (item: conversation) =>
       ({...item, type: "customer", transferText: item.text.replace(/{{/g,'<span>').replace(/}}/g,'</span>')}));

    conversationArr = [].concat(serviceArr,customerArr);
    
    conversationArr.sort((a: conversation, b: conversation) => {
      return a.start - b.start
    })
    this.totalConversationArr = conversationArr;
  }
  conversationArrChanged(){
    const self = this;
    const sortArr = self.totalConversationArr.filter((item) => {
      return item.start<this.current;
    });
    if(sortArr.length > this.conversationArr.length){
      self.scroll();
    }
    this.conversationArr = sortArr;
  }

  scroll(){
    // console.log(timeStap);
    const self = this;
    const $conversationBox = this.$refs.conversationBox as HTMLDivElement;
    // const $showAllConversation = this.$refs.showAllConversation as HTMLDivElement;
    setTimeout(()=>{
      $conversationBox.scrollTop = $conversationBox.scrollHeight;
      // this.$refs.showAllConversation = $conversationBox.scrollHeight + 5;
    },250)
    // console.log($conversationBox.scrollTop);
    // window.requestAnimationFrame(self.scroll);   
  }
}
</script>


<style lang="scss">
@import '../styles/mixin.scss';
.conversation-wrap{
  position: relative;
  background: #fff;
  overflow: hidden;
  .conversation-box{
    border-radius: 5px;
    @include size(554px,460px);
    padding: 30px;
    overflow-y: scroll;
    scroll-behavior: smooth;
    transition: all cubic-bezier(0.4, 0, 1, 1) .15s;     
  }

  .jump-button{
    position: absolute;
    top: 5px;
    left: 0;
    @include size(80px,32px);
    line-height: 32px;
    text-align: center;
    @include skin(#fff,#64CEFF);
    box-shadow: 0 2px 4px 0 rgba(0,0,0,0.13);
    border-radius: 0 100px 100px 0;
    cursor: pointer;
    transition: all cubic-bezier(0.4, 0, 1, 1) .15s; 
    z-index: 1000;
    &:hover,&.active{
      background-color: #36C0FF;
    }
  }
  .conversation-item{
    display: flex;
    align-items: flex-start;
    margin-bottom: 30px;
    justify-content: flex-end;
    $tri-size: 6px;
    &.service{ 
      .avatar-block{
        margin-left: 8px + $tri-size;        
      }
      .bubble{
        background-color: $secondary-color; 
        &::before{
          right: 0;
        }
        &::after{
          right: - $tri-size;
          @include triangle(right,$tri-size,$secondary-color);
          // background-image: url('../assets/icon/right.png');
        }
      }
    }
    &.customer{
      flex-direction: row-reverse;
        .avatar-block{
          margin-right: 8px + $tri-size;   
        }
        .bubble{
          background-color: $subsidiary-color;
          &::before{
            left: 0;
          }
          &::after{
            left: - $tri-size;
            @include triangle(left,$tri-size,$subsidiary-color);
            // background-image: url('../assets/icon/left.png');
          }
        } 
    }
  }
  .bubble{
    position: relative;
    max-width: 330px;
    // border: 1px solid $primary-color;
    padding: $bubble-size;
    border-radius: $bubble-radius;
    color: $text-primary;
    span{
      color:$hight-light-color;
    }
    &::before,&::after{
      position: absolute;      
    }
    &::before{
      bottom: -20px;
      content: attr(start-time);
      color: $text-time;
      font-size: 12px;
    }
    &::after{
      content: '';
      top: 12px;
      // top: 50%;
      // transform: translateY(-50%);
      // background: {
      //   position: center;
      //   repeat: no-repeat;
      //   size: contain;
      // }   
    }
  }
  .avatar-block{
    text-align: center;
    // color: $primary-color;
    position: relative;
    &::before{
      // display: inline-block;
      content: attr(role);
      position: absolute;
      bottom: -20px;
      width: 100%;
      color: #9DA7C8;
    }
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
