<template>
  <div class="audio">
    <audio :src="source" ref="audioRecord" hidden></audio>
    <div class="voice">
      <div class="wave" :class="{'paused':!this.play}"></div>
      <div class="scale"></div>
    </div>

    <div class="audio-bar">
       <button class="action" @click="changeState">
        <svg class="icon" aria-hidden="true">
          <use :xlink:href="`#icon-${play?'pause':'play'}`"></use>
        </svg>
       </button>

       <span class="current-time">{{current|formatTime}}</span>
       <a class="download" :href="source">
         <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-download"></use>
        </svg>
       </a>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop , Watch, Vue } from 'vue-property-decorator';
import { State, Action } from 'vuex-class';
import { formatTime } from '@/filters/formatTime';

@Component({
  name: 'Audio',
  filters:{
    formatTime
  }
})
export default class Audio extends Vue {
  @State('current') current!: number;
  @State('showAll') showAll!: boolean;
  @Action('updateCurrent') updateCurrent:any;

  @Prop({default: ''})
  source!:string;

  @Watch('showAll')
  showAllChanged(val:boolean){
    const audioElement = this.$refs.audioRecord as HTMLAudioElement;
    audioElement.currentTime = audioElement.duration;
   
    setTimeout(()=>{
      this.changeState();      
    },200)
  }

  @Watch('source')
  sourceChanged(val: string){
    const audioElement = this.$refs.audioRecord as HTMLAudioElement;
    audioElement.currentTime = 0;
    this.audioPlay();
  }

  play: boolean = false;

  changeState(){
    const audioElement = this.$refs.audioRecord as HTMLAudioElement;
    const method = this.play ? 'pause' : 'play';
    this.play = !this.play;
    audioElement[method]();
  }
  timeUpadate(){
    const audioElement = this.$refs.audioRecord as HTMLAudioElement;
    const currentTime:number = audioElement && audioElement.currentTime * 1000 as number;
    this.updateCurrent(Math.floor(currentTime));
  }

  audioPlay(){
    const audioElement = this.$refs.audioRecord as HTMLAudioElement;
    audioElement.oncanplay = () => {
      this.play = true;
      audioElement.play();
      audioElement.addEventListener('timeupdate', this.timeUpadate);
    }
    audioElement.addEventListener('ended',()=>{
        this.play = false;
    })
  }

  mounted () {
    this.audioPlay();
  }
}
</script>

<style lang="scss">
@import '../styles/mixin.scss';
.audio{
  width: 100%;
  .voice{
    @include size(100%,74px);
    padding-top: 10px;
    background: url(../../public/images/voice-bg.png) no-repeat center/cover;
    overflow: hidden;
    position: relative;
    .wave{
      @include size(200%,40px);    
      margin-left: -100%;  
      background: url(../../public/images/wave.png) repeat-x;
      background-size: 50%;
      animation: wave linear 15s infinite forwards;
      &.paused{
        animation-play-state: paused;        
      }
    }
    .scale{
      position: absolute;
      bottom: 0;
      @include size(100%,12px);
      background: url(../../public/images/scale.png) no-repeat center/cover;
      // span{
      //   display: block;
      //   float: left;
      //   @include size(80px,12px);
      //   border: {
      //     left: 1px solid rgba(255,255,255,.63);
      //     // right: 1px solid #fff;
      //   }
      //   color: #fff;
      //   font-weight: 100;
      //   font-size: 12px;
      //   line-height: 1;
      //   padding-left: 5px;
      // }
    }
  }
}
.audio-bar {
  $audio-bar-bg:#F3F2F4;
  $audio-bar-height : 30px;
  position: relative;
  width: 100%;
  height: $audio-bar-height;
  background-color: $audio-bar-bg;
  .action,.download{
    background: $audio-bar-bg;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    .icon{
      display: block;
      @include size(15px);
    }
  }
  .action{
    margin-left: 36px;
  }
  .download{
    right: 36px;
  }
  .current-time{
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    color: #888A92;;
    line-height: $audio-bar-height;
  }
}

@keyframes wave {
  0%{
    transform: translateX(0%);
  }
  100%{
    transform: translateX(50%);
  }
}
</style>
