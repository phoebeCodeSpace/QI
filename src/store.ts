import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

interface StateProp {
  current: number;
  voiceId: string;
  showAll: boolean;
}

const StoreState: StateProp = {
  current: 0,
  voiceId: '',
  showAll: false,
};

export default new Vuex.Store({
  state: StoreState,
  mutations: {
    updateCurrent(state, payload: number) {
      state.current = payload;
    },
    changeVoice(state, payload: string) {
      state.voiceId = payload;
    },
    changeConversationState(state, payload: boolean) {
      state.showAll = payload;
    },
  },
  actions: {
    updateCurrent({ commit }, payload: number) {
      commit('updateCurrent', payload);
    },
    changeVoice({ commit }, payload: number ) {
      commit('changeVoice', payload);
    },
    changeConversationState({ commit }, payload: boolean) {
      commit('changeConversationState', payload);
    },
  },
});
