<template>
    <div>
      <Audio :source="source"/>
      <div class="show-content">
        <Conversation 
          :service="serviceArr"
          :customer="customerArr"
        />
        <Comment/>      
      </div>
  </div>
</template>

<script lang="ts">
import { Component,Watch, Vue } from 'vue-property-decorator';
import { Action } from 'vuex-class';
import Conversation from "@/components/Conversation.vue";
import Audio from "@/components/Audio.vue";
import Comment from "@/components/Comment.vue";
import axios from 'axios';
import { Route } from 'vue-router'

Component.registerHooks([
    'beforeRouteUpdate'
])



interface conversation {
  text: string;
  start: number;
  end: number;
}

@Component({
  name: 'QICoversation',
  components: {
    Conversation,
    Audio,
    Comment,
  }
})
export default class QICoversation extends Vue {
  @Action('changeConversationState') changeConversationState:any;
  serviceArr:  Array<conversation> = [];
  customerArr:  Array<conversation> = [];
  source: string = '';

  getVoiceContent(title: string){
    axios.get('/Index/Demo/getJson',{
      params: {
      title
      }
    })
    .then((response) => {
      const data = response.data;
      // self.serviceArr = data.msg_n0;
      // self.customerArr = data.msg_n1;
      console.log(data)
      this.source = `/Index/Demo/downloadVoice?title=${title}`;
      
      this.serviceArr = data.data.n0.contents;
      this.customerArr = data.data.n1.contents;
    })
    .catch((error) => {
      console.log(error);
    });
  }

  mounted () {
    const title: string = this.$route.params.title;
    this.getVoiceContent(title)
  }

  beforeRouteUpdate (to: Route, form: Route, next: Function): void  {
    this.getVoiceContent(to.params.title);
    this.changeConversationState(false);
    next();
  }
}

</script>

