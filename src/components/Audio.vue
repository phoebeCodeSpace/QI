<template>
  <div class="audio">
    <audio :src="source" ref="audioRecord" ></audio>
     <div class="audio-bar">
       <button class="action" @click="changeState">
         <svg class="icon" aria-hidden="true">
          <use :xlink:href="`#icon-${play?'play':'pause'}`"></use>
        </svg>
       </button>
       <span class="current-time">{{current|formatTime}}</span>
     </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { State, Action, Getter } from 'vuex-class';
import { formatTime } from '@/filters/formatTime';

@Component({
  name: 'Audio',
  filters:{
    formatTime
  }
})
export default class Audio extends Vue {
  @State('current') current: number;
  @Action('updateCurrent') updateCurrent:any;

  @Prop({default: './music.mp4'})
  source:string;

  @Prop()
  duration:number;

  play: boolean = true;
 
  changeState(){
    const audioElement = this.$refs.audioRecord as HTMLAudioElement;
    const method = this.play ? 'play' : 'pause';
          this.play = !this.play;
          audioElement[method]();
  }
  timeUpadate(){
    const audioElement = this.$refs.audioRecord as HTMLAudioElement;
    const currentTime:number = audioElement.currentTime * 1000 as number;
    this.updateCurrent(Math.floor(currentTime));
  }

  mounted () {
    const audioElement = this.$refs.audioRecord as HTMLAudioElement;
    audioElement.oncanplay = () => {
      audioElement.addEventListener('timeupdate', this.timeUpadate);
    }
    audioElement.addEventListener('ended',()=>{
          this.play = false;      
    })
  }
}
</script>

<style lang="scss">
@import '../styles/vars.scss';
.audio-bar {
  position: relative;
  width: 100%;
  height: 48px;
  background-color: $primary-color;

  .action{
    background: $primary-color;
    margin-left: 30px;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    .icon{
      display: block;
      width: 20px;
      height: 20px;
    }
  }
  .current-time{
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    color: #fff;
    line-height: 48px;
  }
}
</style>
