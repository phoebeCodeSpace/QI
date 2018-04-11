import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

interface StateProp {
  current: number;
}



export default new Vuex.Store({
  state: {
    current: 0,
  },
  mutations: {
    updateCurrent(state, payload: number) {
      state.current = payload;
    },
  },
  actions: {
    updateCurrent({ commit }, payload: number) {
      commit('updateCurrent', payload);
    },
  },
});
