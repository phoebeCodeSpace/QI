import Vue from 'vue';
import Router from 'vue-router';
import QI from './views/QI.vue';
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'QI',
      component: QI,
    },
  ],
});
