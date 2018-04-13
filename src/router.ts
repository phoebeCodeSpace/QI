import Vue from 'vue';
import Router from 'vue-router';
import QI from './views/QI.vue';
import QICoversation from './views/QICoversation.vue';
Vue.use(Router);

export default new Router({
  // linkActiveClass: 'active',
  linkExactActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: 'QI',
      component: QI,
      children: [
        {
          path: '/:title',
          name: 'QICoversation',
          component: QICoversation,
        },
      ],
      // redirect: '/test',
    },
  ],
});
