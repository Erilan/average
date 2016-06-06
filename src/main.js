import {} from './style/main.css';
import Vue from 'vue';
import VueRouter from 'vue-router';
import {configRouter} from './routeConfig';

Vue.use(VueRouter);
Vue.config.debug = true;

var App = Vue.extend({});
export var router = new VueRouter();

configRouter(router);

router.start(App, '#app');

