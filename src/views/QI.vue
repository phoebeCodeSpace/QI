<template>
  <div class="qi-wrap ">
    <List :list="voiceList"/>
    <div class="content">
      <router-view></router-view>
    </div>
    <Description/>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Provide } from 'vue-property-decorator';
import Description from "@/components/Description.vue";
import List from "@/components/List.vue";
import axios from 'axios';



@Component({
  name: 'QI',
  components: {
    Description,
    List
  }
})
export default class QI extends Vue {
  voiceList: Array<string> = [];

  getVoiceList(){
    const title: string = this.$route.params.title;
    const self = this;
    
    axios.get('/Index/Demo/getVoiceList')
    .then((response) => {
      this.voiceList = response.data.data;
      // title==='test' && 
      !title && 
      this.$router.push({ name: 'QICoversation', params: { title: this.voiceList[0] }})
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  mounted () {
    this.getVoiceList();
    setInterval(()=>{
      this.getVoiceList();
    },5000)
  }
}
</script>
<style lang="scss">
@import '../styles/mixin.scss';

.qi-wrap {
  @include center-flex();
  .content{
    width: 840px;
    box-shadow: 0 2px 4px 0 rgba(0,0,0,0.21);
    border-radius: 5px;
    overflow: hidden;
  }
}
.show-content{
  display: flex;
  background-color: #fff;
}
</style>
