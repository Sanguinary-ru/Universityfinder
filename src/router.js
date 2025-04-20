import { createRouter, createWebHistory } from 'vue-router';
import main from './components/main.vue';
import opis from './components/opis.vue';

const routes = [
    { path: '/', component: main },
    { path: '/opis/:name', component: opis, name: 'opis'}

];

export const router = createRouter({
  history: createWebHistory(),
  routes
});
