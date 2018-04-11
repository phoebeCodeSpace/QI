<template>
  <div class="show-content flex-center">    
      <div>
        <Audio 
          :duration="sourceDuration"
        />
        <div class="show-content">
          <Conversation 
            :service="serviceArr"
            :customer="customerArr"
          />
          <Comment/>      
        </div>        
      </div>
      <Description/> 
  </div>
</template>

<script lang="ts">
import { Component, Vue, Provide } from 'vue-property-decorator';
import Conversation from "@/components/Conversation.vue";
import Audio from "@/components/Audio.vue";
import Comment from "@/components/Comment.vue";
import Description from "@/components/Description.vue";
import axios from 'axios';

interface conversation {
  text: string;
  start: number;
  end: number;
}

@Component({
  name: 'QI',
  components: {
    Conversation,
    Audio,
    Comment,
    Description
  }
})
export default class QI extends Vue {

  serviceArr:  Array<conversation> = [];
  customerArr:  Array<conversation> = [];
  source: string = '';
  sourceDuration: number = 0;

  mounted () {
    const self = this;
    axios.get('/api')
      .then(function (response) {
        const data = response.data;
        self.serviceArr = data.msg_n0;
        self.customerArr = data.msg_n1;
        // self.source = data.info.waveuri;
        self.sourceDuration = data.info.duration;
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}
</script>
<style lang="scss">
.flex-center{
  align-items: center;
}
.show-content{
  display: flex;
}
</style>
