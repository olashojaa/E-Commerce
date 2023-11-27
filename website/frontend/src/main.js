import { createApp } from 'vue';
import App from './App.vue';
import store from './store';
import router from './router';
import './assets/css/main.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faBars, faCircleUser, faGlobe } from '@fortawesome/free-solid-svg-icons';
import VueRouter from 'vue-router';
import mitt from 'mitt';
const emitter = mitt();

library.add(faBars, faCircleUser, faGlobe);


const app = createApp(App);
app.config.globalProperties.emitter = emitter;

app.component('font-awesome-icon', FontAwesomeIcon);
app.use(store);
app.use(router);
app.use(VueRouter);
app.mount('#app');