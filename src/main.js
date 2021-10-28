import Vue from 'vue'
import App from './App.vue'
import "./assets/incon/inconfont.css"
import 'element-ui/lib/theme-chalk/index.css';
import 'font-awesome/css/font-awesome.min.css'
import './assets/css/global.css'
import api from "./plugins/api";



import router from "./router"
//import store from "./store"
import ElementUI from "element-ui";
import {Loading} from "element-ui";
import VueRouter from "vue-router";
Vue.use(VueRouter)
Vue.use(ElementUI)
Vue.use(Loading);

Vue.config.productionTip = false
Vue.prototype.$http=api;


new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
