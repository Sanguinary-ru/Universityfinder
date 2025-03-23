import { createRouter, createWebHistory } from 'vue-router';
import fivecomponent from './components/fivecomponent.vue';
import opis from './components/opis.vue';

const routes = [
    { path: '/', component: fivecomponent },
    { path: '/opis/:name', component: opis, name: 'opis'}

];

export const router = createRouter({
  history: createWebHistory(),
  routes
});
