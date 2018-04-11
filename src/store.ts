import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

interface StateProp {
  current: number;
}

const StoreState: StateProp = {
  current: 0,
};

export default new Vuex.Store({
  state: StoreState,
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
